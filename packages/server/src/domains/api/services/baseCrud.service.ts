import { modelTypes } from "../../database";
import { User } from "@parsimony/types/dist";

import { AppDataGateway } from "../../app/app.data.gateway";
import { Injectable } from "@nestjs/common";

export type AuthContext = {
  currentUser: Omit<User, "schoolId"> & { schoolId: string };
};

@Injectable()
export class BaseCrudService {
  #adg: AppDataGateway;

  constructor(adg: AppDataGateway) {
    this.#adg = adg;
  }

  async create(
    model: modelTypes,
    { payload }: { payload: any },
    { currentUser }: AuthContext
  ) {
    try {
      const entry = await this.#adg
        .dbBySchoolId(currentUser.schoolId)
        .createEntry(model, {
          ...payload
        });
      return entry;
    } catch (error) {
      console.error("Create error", error);
    }
  }

  async delete(
    model: modelTypes,
    { payload }: { payload: any },
    { currentUser }: AuthContext
  ) {
    await this.#adg
      .dbBySchoolId(currentUser.schoolId)
      .deleteEntry(model, payload.id);
    return payload.id;
  }

  async update(
    model: modelTypes,
    { payload }: { payload: any },
    { currentUser }: AuthContext
  ) {
    const db = this.#adg.dbBySchoolId(currentUser.schoolId);

    await db.findAndUpdateEntry(model, { _id: payload.id }, payload);
    const updatedEntry = await db.findEntry(model, {
      _id: payload.id
    });
    return updatedEntry;
  }

  async getAll(model: modelTypes, { currentUser }: AuthContext) {
    return await this.#adg
      .dbBySchoolId(currentUser.schoolId)
      .findAllEntries(model);
  }

  async get(
    model: modelTypes,
    { payload }: { payload: { id: string } },
    { currentUser }: AuthContext
  ) {
    return await this.#adg.dbBySchoolId(currentUser.schoolId).findEntry(model, {
      _id: payload.id
    });
  }

  async getAllByRelationship(
    model: modelTypes,
    { payload }: { payload: { relationshipProperty: string; id: string } },
    { currentUser }: AuthContext
  ) {
    const db = this.#adg.dbBySchoolId(currentUser.schoolId);

    // Matches any direct ids or matches an id in an array
    const foundModel = await db.getModel(model);
    const propertyInstance =
      foundModel.schema.paths[payload.relationshipProperty].instance;
    const match =
      propertyInstance === "Array"
        ? {
            [payload.relationshipProperty]: {
              $elemMatch: { id: payload.id }
            }
          }
        : { [payload.relationshipProperty]: payload.id };

    const ret = await db.findEntries(model, {
      // In some cases we are fetching an ID of something we need clientside so we also want to return the item that we are matching
      $or: [match]
    });

    return ret;
  }
}
