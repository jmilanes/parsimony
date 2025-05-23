import { modelTypes } from "../database";

import { AppDataGateway } from "../database/app.data.gateway";
import { Injectable } from "@nestjs/common";
import { AuthContext } from "../../api/decorators";
import TokenService from "../database/token.service";
import { ObjectId } from "mongodb";
import { ByRelationshipPayload } from "@parsimony/types";

@Injectable()
export class BaseCrudService {
  #adg: AppDataGateway;
  #ts: TokenService;

  constructor(adg: AppDataGateway, ts: TokenService) {
    this.#adg = adg;
    this.#ts = ts;
  }

  async create(model: modelTypes, payload: any, authCtx: AuthContext) {
    try {
      const currentUser = await this.#ts.getUserFromAuthorization(
        authCtx.authorization
      );

      const entry = await this.#adg
        .dbBySchoolId(currentUser?.schoolId)
        .createEntry(model, {
          ...payload
        });
      return entry;
    } catch (error) {
      console.error("Create error", error);
    }
  }

  async delete(model: modelTypes, payload: any, authCtx: AuthContext) {
    const currentUser = await this.#ts.getUserFromAuthorization(
      authCtx.authorization
    );
    await this.#adg
      .dbBySchoolId(currentUser?.schoolId)
      .deleteEntry(model, payload.id);
    return { id: payload.id };
  }

  async update(model: modelTypes, payload: any, authCtx: AuthContext) {
    const currentUser = await this.#ts.getUserFromAuthorization(
      authCtx.authorization
    );
    const db = this.#adg.dbBySchoolId(currentUser?.schoolId);

    await db.findAndUpdateEntry(model, { _id: payload.id }, payload);
    const updatedEntry = await db.findEntry(model, {
      _id: payload.id
    });
    return updatedEntry;
  }

  async getAll(model: modelTypes, authCtx: AuthContext) {
    const currentUser = await this.#ts.getUserFromAuthorization(
      authCtx.authorization
    );
    return await this.#adg
      .dbBySchoolId(currentUser?.schoolId)
      .findAllEntries(model);
  }

  async get(model: modelTypes, payload: { id: string }, authCtx: AuthContext) {
    const currentUser = await this.#ts.getUserFromAuthorization(
      authCtx.authorization
    );
    const entry = await this.#adg
      .dbBySchoolId(currentUser?.schoolId)
      .findEntry(model, {
        _id: payload.id
      });

    if (!entry) {
      throw new Error(`${model} not found`);
    }

    return entry;
  }

  async getAllByRelationship(
    model: modelTypes,
    payload: ByRelationshipPayload,
    authCtx: AuthContext
  ) {
    const currentUser = await this.#ts.getUserFromAuthorization(
      authCtx.authorization
    );
    const db = this.#adg.dbBySchoolId(currentUser?.schoolId);

    // Matches any direct ids or matches an id in an array
    const foundModel = await db.getModel(model);
    const propertyInstance =
      foundModel.schema.paths[payload.relationshipProperty]?.instance;

    const match =
      propertyInstance === "Array"
        ? {
            [payload.relationshipProperty]: {
              $elemMatch: { id: this.#resolveMatchValue(payload) }
            }
          }
        : {
            [payload.relationshipProperty]: this.#resolveMatchValue(payload)
          };

    const ret = await db.findEntries(model, {
      // In some cases we are fetching an ID of something we need clientside
      // so we also want to return the item that we are matching
      $or: [match]
    });

    return ret;
  }

  #resolveMatchValue(payload: ByRelationshipPayload) {
    try {
      return new ObjectId(payload.id);
    } catch (e) {}
    return payload.id;
  }
}
