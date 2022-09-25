import { ICreateResolverParams } from "./";
import { modelTypes } from "../database/models";

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export class CrudResolvers {
  model: modelTypes;
  constructor(model: modelTypes) {
    this.model = model;
  }
  propWithModel(action: string, suffix?: boolean) {
    return `${action}${capitalize(this.model)}${suffix ? "s" : ""}`;
  }

  getMutations(CreateResolverParams: ICreateResolverParams) {
    return {
      [this.propWithModel("create")]: this.create(CreateResolverParams),
      [this.propWithModel("delete")]: this.delete(CreateResolverParams),
      [this.propWithModel("update")]: this.update(CreateResolverParams)
    };
  }

  getQuires(CreateResolverParams: ICreateResolverParams) {
    return {
      [this.propWithModel("getAll", true)]: this.getAll(CreateResolverParams),
      [this.propWithModel("get")]: this.get(CreateResolverParams)
    };
  }

  getResolver() {
    return (CreateResolverParams: ICreateResolverParams) => ({
      Mutation: this.getMutations(CreateResolverParams),
      Query: this.getQuires(CreateResolverParams)
    });
  }

  create =
    ({ db }: ICreateResolverParams) =>
    async (_: any, { payload }: { payload: any }) => {
      try {
        const entry = await db.createEntry(this.model, {
          ...payload
        });
        return entry;
      } catch (error) {
        console.log("Create error", error);
      }
    };

  delete =
    ({ db }: ICreateResolverParams) =>
    async (_: any, { payload }: { payload: any }) => {
      await db.deleteEntry(this.model, payload.id);
      return payload.id;
    };

  update =
    ({ db }: ICreateResolverParams) =>
    async (_: any, { payload }: { payload: any }) => {
      await db.findAndUpdateEntry(this.model, { _id: payload.id }, payload);
      return await db.findEntry(this.model, { _id: payload.id });
    };

  getAll =
    ({ db }: ICreateResolverParams) =>
    async () =>
      await db.findAllEntries(this.model);

  get =
    ({ db }: ICreateResolverParams) =>
    async (_: any, payload: { id: string }) =>
      await db.findEntry(this.model, payload);

  getAllByRelationship =
    ({ db }: ICreateResolverParams) =>
    async (_: any, { propToMatch, id }: { propToMatch: string; id: string }) =>
      await db.findEntries(modelTypes.thread, {
        [propToMatch]: id
      });
}
