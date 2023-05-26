import { modelTypes } from "../../models";
import { BaseCrudResolvers } from "../baseCrudResolver";
import { Service } from "typedi";
import { BroadcastService, DataBaseService } from "../../index";
import {
  Collection,
  CollectionTypes,
  Program,
  ProgramTypes
} from "@parsimony/types";

type CollectionUpdates = {
  clientId: string;
  parentCollectionId?: string;
  ancestors?: string[];
  excludedIds: string[];
};

type ProgramUpdates = {
  collectionId?: string;
  clientId: string;
  excludedIds?: string[];
};

type AddToClientsPayLoad = {
  payload: {
    collectionIds: string[];
    programIds: string[];
    excludedIds: string[];
    clientId: string;
    subscribers: string[];
  };
};

@Service()
export class ProgramResolvers extends BaseCrudResolvers {
  #db: DataBaseService;

  constructor(db: DataBaseService, bs: BroadcastService) {
    super(db, bs);
    this.#db = db;
    this.model = modelTypes.program;
    this.initMutations();
  }

  initMutations() {
    this.setMutation("addProgramsToClient", this.addProgramsToClient);
  }

  //TODO Archive all Program results when a program is deleted
  delete = async (_: any, { payload }: { payload: any }) => {
    console.log("FROM Program Delete Extension");
    await this.#db.deleteEntry(this.model, payload.id);
    return payload.id;
  };

  addProgramsToClient = async (
    _: any,
    {
      payload: { collectionIds, programIds, clientId, excludedIds }
    }: AddToClientsPayLoad
  ) => {
    const createdPrograms: Record<string, true> = {};
    await this.#copyCollectionByIds(
      collectionIds,
      {
        clientId,
        excludedIds
      },
      createdPrograms
    );
    await this.#copyProgramsByIds(
      programIds,
      { clientId, excludedIds },
      createdPrograms
    );
  };

  #copyCollectionByIds = async (
    collectionIds: string[],
    updates: CollectionUpdates,
    programCache: Record<string, true>
  ) => {
    await Promise.all(
      collectionIds.map(async (originalCollectionId) => {
        if (updates.excludedIds.includes(originalCollectionId)) {
          return;
        }
        const payload = await this.#createCollectionPayload(
          originalCollectionId,
          updates
        );
        const newCollection = await this.#db.createEntry(
          modelTypes.collection,
          payload
        );

        const newCollectionId = newCollection.id;
        const newCollectionAncestors = newCollection.ancestors;

        const children = await this.#getChildCollectionIds(
          originalCollectionId
        );

        await this.#copyCollectionByIds(
          children,
          {
            clientId: updates.clientId,
            parentCollectionId: newCollectionId,
            ancestors: newCollectionAncestors,
            excludedIds: updates.excludedIds
          },
          programCache
        );

        const programs = await this.#getProgramIds(originalCollectionId);
        await this.#copyProgramsByIds(
          programs,
          {
            collectionId: newCollectionId,
            clientId: updates.clientId,
            excludedIds: updates.excludedIds
          },
          programCache
        );
      })
    );
  };

  #createCollectionPayload = async (id: string, updates: CollectionUpdates) => {
    const collection = await this.#db.findEntry(modelTypes.collection, {
      id
    });

    const copyPayload = collection.toJSON();
    delete copyPayload.id;
    delete copyPayload._id;
    copyPayload.type = CollectionTypes.Client;
    copyPayload.clientId = updates.clientId;
    copyPayload.parentCollectionId = updates.parentCollectionId;
    copyPayload.ancestors = updates.ancestors
      ? [...updates.ancestors, updates.parentCollectionId]
      : [];

    return copyPayload;
  };

  #getChildCollectionIds = async (id: string) => {
    const children: Collection[] = await this.#db.findEntries(
      modelTypes.collection,
      { parentCollectionId: id }
    );
    return children.map((child) => child.id);
  };

  #getProgramIds = async (id: string) => {
    const programs: Program[] = await this.#db.findEntries(modelTypes.program, {
      collectionId: id
    });

    return programs.map((program) => program.id);
  };

  #copyProgramsByIds = async (
    programIds: string[],
    update: ProgramUpdates,
    cache: Record<string, true>
  ) => {
    await Promise.all(
      programIds.map(async (originalProgramId: string) => {
        if (
          !cache[originalProgramId] &&
          !update.excludedIds?.includes(originalProgramId)
        ) {
          const program = await this.#db.findEntry(modelTypes.program, {
            id: originalProgramId
          });

          const copyPayload = program.toJSON();
          delete copyPayload._id;
          delete copyPayload.id;
          copyPayload.clientId = update.clientId;
          copyPayload.type = ProgramTypes.Client;
          copyPayload.collectionId = update.collectionId;
          await this.#db.createEntry(modelTypes.program, copyPayload);
          // Add To Cache so we don't do extra work
          cache[originalProgramId] = true;
        }
      })
    );
  };
}
