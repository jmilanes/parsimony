import { modelTypes } from "../../database";
import { validateRole } from "../../autherization/validateRole";
import { UserRoles } from "@parsimony/types";
import { AppDataGateway } from "../app.data.gateway";
import { Injectable } from "@nestjs/common";
import { AuthContext } from "../../api/decorators";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

type IReducer = (_: any, payload: any, context: AuthContext) => Promise<any>;

@Injectable()
export class BaseCrudResolvers {
  model: modelTypes = "" as modelTypes;
  mutations: Record<string, IReducer> = {};
  #adg: AppDataGateway;

  constructor(adg: AppDataGateway) {
    this.#adg = adg;
  }

  propWithModel(action: string, suffix?: boolean) {
    return `${action}${capitalize(this.model)}${suffix ? "s" : ""}`;
  }

  getMutations() {
    return {
      [this.propWithModel("create")]: this.create,
      [this.propWithModel("delete")]: this.delete,
      [this.propWithModel("update")]: this.update,
      ...this.mutations
    };
  }

  setMutation(key: string, mutation: IReducer) {
    this.mutations[key] = mutation;
  }

  getQuires() {
    return {
      [this.propWithModel("getAll", true)]: this.getAll,
      [this.propWithModel("get")]: this.get,
      [`${this.propWithModel("getAll", true)}ByRelationship`]:
        this.getAllByRelationship
    };
  }

  getResolver() {
    return {
      Mutation: this.#mutationsWithAuthorization(),
      Query: this.getQuires()
    };
  }

  #mutationsWithAuthorization() {
    const mutations = this.getMutations();
    const keys = Object.keys(mutations);
    const ret: any = {};
    for (const key of keys) {
      ret[key] = validateRole([UserRoles.Admin, UserRoles.Director])(
        (_: any, args: any, context: AuthContext) => {
          return mutations[key](_, args, context);
        }
      );
    }

    return ret;
  }

  async create(
    _: any,
    { payload }: { payload: any },
    { currentUser }: AuthContext
  ) {
    try {
      const entry = await this.#adg
        .dbBySchoolId(currentUser.schoolId)
        .createEntry(this.model, {
          ...payload
        });
      return entry;
    } catch (error) {
      console.error("Create error", error);
    }
  }

  async delete(
    _: any,
    { payload }: { payload: any },
    { currentUser }: AuthContext
  ) {
    await this.#adg
      .dbBySchoolId(currentUser.schoolId)
      .deleteEntry(this.model, payload.id);
    return payload.id;
  }

  async update(
    _: any,
    { payload }: { payload: any },
    { currentUser }: AuthContext
  ) {
    const db = this.#adg.dbBySchoolId(currentUser.schoolId);

    await db.findAndUpdateEntry(this.model, { _id: payload.id }, payload);
    const updatedEntry = await db.findEntry(this.model, {
      _id: payload.id
    });
    return updatedEntry;
  }

  async getAll(_: any, _p: any, { currentUser }: AuthContext) {
    return await this.#adg
      .dbBySchoolId(currentUser.schoolId)
      .findAllEntries(this.model);
  }

  async get(
    _: any,
    { payload }: { payload: { id: string } },
    { currentUser }: AuthContext
  ) {
    return await this.#adg
      .dbBySchoolId(currentUser.schoolId)
      .findEntry(this.model, {
        _id: payload.id
      });
  }

  async getAllByRelationship(
    _: any,
    { payload }: { payload: { relationshipProperty: string; id: string } },
    { currentUser }: AuthContext
  ) {
    const db = this.#adg.dbBySchoolId(currentUser.schoolId);

    // Matches any direct ids or matches an id in an array
    const model = await db.getModel(this.model);
    const propertyInstance =
      model.schema.paths[payload.relationshipProperty].instance;
    const match =
      propertyInstance === "Array"
        ? {
            [payload.relationshipProperty]: {
              $elemMatch: { id: payload.id }
            }
          }
        : { [payload.relationshipProperty]: payload.id };

    const ret = await db.findEntries(this.model, {
      // In some cases we are fetching an ID of something we need clientside so we also want to return the item that we are matching
      $or: [match]
    });

    return ret;
  }
}
