import { DataBaseService, modelTypes } from "../../database";
import {
  AddProgramsToClientPayload,
  Collection,
  CollectionTypes,
  Program,
  ProgramTypes,
  ProgramViewTypes
} from "@parsimony/types";
import { AppDataGateway } from "../../database/app.data.gateway";
import { Injectable } from "@nestjs/common";
import { AuthContext } from "../../../api/decorators";
import TokenService from "../../database/token.service";

type CollectionUpdates = {
  clientId: string;
  parentCollectionId?: string;
  ancestors?: string[];
  excludedIds: Map<string, boolean>;
};

type ProgramUpdates = {
  collectionId?: string;
  clientId: string;
  excludedIds?: Map<string, boolean>;
};

const createMapFromStringArray = (arr: string[]) =>
  new Map(arr.map((x) => [x, true]));

@Injectable()
export class ProgramApiService {
  #adg: AppDataGateway;
  #ts: TokenService;

  constructor(adg: AppDataGateway, ts: TokenService) {
    this.#adg = adg;
    this.#ts = ts;
  }

  async addProgramsToClient(
    {
      collectionIds,
      programIds,
      clientId,
      excludedIds
    }: AddProgramsToClientPayload,
    { authorization }: AuthContext
  ) {
    const createdPrograms: Record<string, true> = {};
    const createdCollections: Record<string, true> = {};
    const excludedIdsMap = createMapFromStringArray(excludedIds);

    const currentUser = await this.#ts.getUserFromAuthorization(authorization);

    const db = this.#adg.dbBySchoolId(currentUser.schoolId);

    await this.#copyCollectionByIds(
      collectionIds,
      {
        clientId,
        excludedIds: excludedIdsMap
      },
      createdPrograms,
      createdCollections,
      db
    );
    await this.#copyProgramsByIds(
      programIds,
      { clientId, excludedIds: excludedIdsMap },
      createdPrograms,
      db
    );
  }

  #copyCollectionByIds = async (
    collectionIds: string[],
    updates: CollectionUpdates,
    programCache: Record<string, true>,
    collectionCache: Record<string, true>,
    db: DataBaseService<modelTypes>
  ) => {
    for (const originalCollectionId of collectionIds) {
      if (
        updates.excludedIds.has(originalCollectionId) ||
        collectionCache[originalCollectionId]
      ) {
        return;
      }

      const payload = await this.#createCollectionPayload(
        originalCollectionId,
        updates,
        db
      );

      if (
        collectionIds.includes(payload.parentCollectionId) &&
        !collectionCache[payload.parentCollectionId]
      ) {
        return;
      }

      if (collectionCache[payload.parentCollectionId]) {
        return;
      }

      const newCollection = await db.createEntry(
        modelTypes.collection,
        payload
      );
      collectionCache[originalCollectionId] = true;

      const newCollectionId = newCollection.id;
      const newCollectionAncestors = newCollection.ancestors;

      const children = await this.#getChildCollectionIds(
        originalCollectionId,
        db
      );

      await this.#copyCollectionByIds(
        children,
        {
          clientId: updates.clientId,
          parentCollectionId: newCollectionId,
          ancestors: newCollectionAncestors,
          excludedIds: updates.excludedIds
        },
        programCache,
        collectionCache,
        db
      );

      const programs = await this.#getProgramIds(originalCollectionId, db);
      await this.#copyProgramsByIds(
        programs,
        {
          collectionId: newCollectionId,
          clientId: updates.clientId,
          excludedIds: updates.excludedIds
        },
        programCache,
        db
      );
    }
  };

  #createCollectionPayload = async (
    id: string,
    updates: CollectionUpdates,
    db: DataBaseService<modelTypes>
  ) => {
    const collection = await db.findEntry(modelTypes.collection, {
      _id: id
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

  #getChildCollectionIds = async (
    id: string,
    db: DataBaseService<modelTypes>
  ) => {
    const children: Collection[] = await db.findEntries(modelTypes.collection, {
      parentCollectionId: id
    });
    return children.map((child) => child.id);
  };

  #getProgramIds = async (id: string, db: DataBaseService<modelTypes>) => {
    const programs: Program[] = await db.findEntries(modelTypes.program, {
      collectionId: id
    });

    return programs.map((program) => program.id);
  };

  #copyProgramsByIds = async (
    programIds: string[],
    update: ProgramUpdates,
    cache: Record<string, true>,
    db: DataBaseService<modelTypes>
  ) => {
    for (const originalProgramId of programIds) {
      const shouldAddProgram =
        !cache[originalProgramId] &&
        !update.excludedIds?.has(originalProgramId);

      if (shouldAddProgram) {
        const program = await db.findEntry(modelTypes.program, {
          _id: originalProgramId
        });

        const copyPayload = program.toJSON();
        delete copyPayload._id;
        delete copyPayload.id;
        copyPayload.clientId = update.clientId;
        copyPayload.type = ProgramTypes.Client;
        copyPayload.collectionId = update.collectionId;
        copyPayload.mainProgramId = originalProgramId;

        //TODO: Look into why this is happening for non total chains add form
        if (copyPayload.targetStyle !== ProgramViewTypes.Behavior) {
          delete copyPayload.behavior;
        }

        try {
          await db.createEntry(modelTypes.program, copyPayload);
        } catch (e) {
          console.error(e);
          console.error("ERROR IN PROGRAM COPY");
        }
        // Add To Cache so we don't do extra work!
        cache[originalProgramId] = true;
      }
    }
  };
}
