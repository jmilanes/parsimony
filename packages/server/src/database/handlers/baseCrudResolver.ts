import { BroadcastService, DataBaseService, modelTypes } from "../index";
import { Service } from "typedi";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

@Service()
export class BaseCrudResolvers {
  model: modelTypes = "" as modelTypes;
  extendedMutations: any;
  shouldBroadcast: boolean = false;
  #bs: BroadcastService;
  #db: DataBaseService;

  constructor(db: DataBaseService, bs: BroadcastService) {
    this.extendedMutations = {};
    this.#bs = bs;
    this.#db = db;
  }

  propWithModel(action: string, suffix?: boolean) {
    return `${action}${capitalize(this.model)}${suffix ? "s" : ""}`;
  }

  getMutations() {
    return {
      [this.propWithModel("create")]: this.create,
      [this.propWithModel("delete")]: this.delete,
      [this.propWithModel("update")]: this.update,
      ...this.extendedMutations
    };
  }

  getQuires() {
    return {
      [this.propWithModel("getAll", true)]: this.getAll,
      [this.propWithModel("get")]: this.get,
      [`${this.propWithModel("getAll", true)}ByRelationship`]:
        this.getAllByRelationship
    };
  }

  broadcast = (type: string, payload: any) => {
    if (this.shouldBroadcast) {
      this.#bs.broadcast({
        type: `${type}_${this.model.toUpperCase()}`,
        payload
      });
    }
  };

  getResolver() {
    return {
      Mutation: this.getMutations(),
      Query: this.getQuires()
    };
  }

  create = async (_: any, { payload }: { payload: any }) => {
    console.log(payload);
    try {
      const entry = await this.#db.createEntry(this.model, {
        ...payload
      });
      this.broadcast("CREATE", {
        ...entry.toJSON(),
        id: entry._id
      });
      return entry;
    } catch (error) {
      console.log("Create error", error);
    }
  };

  delete = async (_: any, { payload }: { payload: any }) => {
    await this.#db.deleteEntry(this.model, payload.id);
    this.broadcast("DELETE", {
      id: payload.id
    });
    return payload.id;
  };

  update = async (_: any, { payload }: { payload: any }) => {
    await this.#db.findAndUpdateEntry(this.model, { _id: payload.id }, payload);
    const updatedEntry = await this.#db.findEntry(this.model, {
      _id: payload.id
    });
    this.broadcast("UPDATE", {
      ...updatedEntry,
      id: updatedEntry._id
    });
    return updatedEntry;
  };

  getAll = async () => await this.#db.findAllEntries(this.model);

  get = async (_: any, { payload }: { payload: { id: string } }) => {
    return await this.#db.findEntry(this.model, {
      _id: payload.id
    });
  };

  getAllByRelationship = async (
    _: any,
    { payload }: { payload: { relationshipProperty: string; id: string } }
  ) => {
    // Matches any direct ids or matches an id in an array
    const model = await this.#db.getModel(this.model);
    const propertyInstance =
      model.schema.paths[payload.relationshipProperty].instance;
    const match =
      propertyInstance === "Array"
        ? { [payload.relationshipProperty]: { $elemMatch: { id: payload.id } } }
        : { [payload.relationshipProperty]: payload.id };

    return await this.#db.findEntries(this.model, {
      // In some cases we are fetching an ID of something we need clientside so we also want to return the item that we are matching
      $or: [match]
    });
  };
}
