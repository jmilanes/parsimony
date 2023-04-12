import { ICreateResolverParams } from "./";
import { modelTypes } from "../database";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// TODO Apply DI With DB and Broadcast
export class CrudResolvers {
  model: modelTypes;
  extendedMutations: any;

  constructor(
    model: modelTypes,
    private readonly shouldBroadcast: boolean = false
  ) {
    this.model = model;
    this.extendedMutations = {};
  }

  propWithModel(action: string, suffix?: boolean) {
    return `${action}${capitalize(this.model)}${suffix ? "s" : ""}`;
  }

  getExtendedMutations = (CreateResolverParams: ICreateResolverParams) => {};

  getMutations(CreateResolverParams: ICreateResolverParams) {
    return {
      [this.propWithModel("create")]: this.create(CreateResolverParams),
      [this.propWithModel("delete")]: this.delete(CreateResolverParams),
      [this.propWithModel("update")]: this.update(CreateResolverParams),
      ...this.extendedMutations
    };
  }

  getQuires(CreateResolverParams: ICreateResolverParams) {
    return {
      [this.propWithModel("getAll", true)]: this.getAll(CreateResolverParams),
      [this.propWithModel("get")]: this.get(CreateResolverParams),
      [`${this.propWithModel("getAll", true)}ByRelationship`]:
        this.getAllByRelationship(CreateResolverParams)
    };
  }

  broadcast = (broadcast: any, type: string, payload: any) => {
    if (this.shouldBroadcast) {
      broadcast({
        type: `${type}_${this.model.toUpperCase()}`,
        payload
      });
    }
  };

  getResolver() {
    return (CreateResolverParams: ICreateResolverParams) => ({
      Mutation: this.getMutations(CreateResolverParams),
      Query: this.getQuires(CreateResolverParams)
    });
  }

  create =
    ({ db, broadcast }: ICreateResolverParams) =>
    async (_: any, { payload }: { payload: any }) => {
      try {
        const entry = await db.createEntry(this.model, {
          ...payload
        });
        this.broadcast(broadcast, "CREATE", {
          ...entry.toJSON(),
          id: entry._id
        });
        return entry;
      } catch (error) {
        console.log("Create error", error);
      }
    };

  delete =
    ({ db, broadcast }: ICreateResolverParams) =>
    async (_: any, { payload }: { payload: any }) => {
      await db.deleteEntry(this.model, payload.id);
      this.broadcast(broadcast, "DELETE", {
        id: payload.id
      });
      return payload.id;
    };

  update =
    ({ db, broadcast }: ICreateResolverParams) =>
    async (_: any, { payload }: { payload: any }) => {
      await db.findAndUpdateEntry(this.model, { _id: payload.id }, payload);
      const updatedEntry = await db.findEntry(this.model, { _id: payload.id });
      this.broadcast(broadcast, "UPDATE", {
        ...updatedEntry,
        id: updatedEntry._id
      });
      return updatedEntry;
    };

  getAll =
    ({ db }: ICreateResolverParams) =>
    async () =>
      await db.findAllEntries(this.model);

  get =
    ({ db }: ICreateResolverParams) =>
    async (_: any, { payload }: { payload: { id: string } }) => {
      const entry = await db.findEntry(this.model, {
        _id: payload.id
      });
      return entry;
    };

  getAllByRelationship =
    ({ db }: ICreateResolverParams) =>
    async (
      _: any,
      { payload }: { payload: { relationshipProperty: string; id: string } }
    ) => {
      // Matches any direct ids or matches an id in an array
      return await db.findEntries(this.model, {
        [payload.relationshipProperty]: payload.id,
        [payload.relationshipProperty]: { $elemMatch: { id: payload.id } }
      });
    };
}
