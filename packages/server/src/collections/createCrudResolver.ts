import { IObjectAny } from "@parsimony/types";
import { ICreateResolverParams } from "./";
import { modelTypes } from "../database/models";

type ICrudResolverExtensions = {
  queries: IObjectAny;
  mutations: IObjectAny;
};

const capitalizeFirstLetter = (text: string) => {
  const firstLetter = text.charAt(0).toUpperCase();
  return firstLetter + text.slice(1);
};

const createCrudResolver = (
  model: modelTypes,
  extensions?: ICrudResolverExtensions
) => {
  const propWithModel = (action: string, suffix?: boolean) =>
    `${action}${capitalizeFirstLetter(model)}${suffix ? "s" : ""}`;
  return (CreateResolverParams: ICreateResolverParams) => ({
    Mutation: {
      [propWithModel("create")]: createModel(CreateResolverParams, model),
      [propWithModel("delete")]: deleteModel(CreateResolverParams, model),
      [propWithModel("update")]: updateModel(CreateResolverParams, model),
      ...extensions?.mutations
    },
    Query: {
      [propWithModel("getAll", true)]: getModels(CreateResolverParams, model),
      [propWithModel("get")]: getModelById(CreateResolverParams, model)
    }
  });
};

export const createModel =
  ({ db }: ICreateResolverParams, model: modelTypes) =>
  async (_: any, { payload }: { payload: any }) => {
    const thread = await db.createEntry(model, {
      ...payload
    });
    return thread;
  };

export const deleteModel =
  ({ db }: ICreateResolverParams, model: modelTypes) =>
  async (_: any, { payload }: { payload: any }) => {
    await db.deleteEntry(model, payload.id);
    return payload.id;
  };

export const updateModel =
  ({ db }: ICreateResolverParams, model: modelTypes) =>
  async (_: any, { payload }: { payload: any }) => {
    await db.findAndUpdateEntry(model, { _id: payload.id }, payload);
    return await db.findEntry(model, { _id: payload.id });
  };

export const getModels =
  ({ db }: ICreateResolverParams, model: modelTypes) =>
  async () =>
    await db.models[model].find({});

export const getModelById =
  ({ db }: ICreateResolverParams, model: modelTypes) =>
  async (_: any, payload: { id: string }) =>
    await db.findEntry(model, payload);

export default createCrudResolver;
