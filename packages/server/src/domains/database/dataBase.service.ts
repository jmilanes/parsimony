import { DBConnectionService } from "./dbConnecitonService.service";

import { Service, Container } from "typedi";
import * as mongoose from "mongoose";

type EnumType<T> = {
  [K in keyof T]: { value: T[K]; label: string };
};

export const TEST_MEMORY_SERVER_TOKEN = "TEST_MEMORY_SERVER_TOKEN";

@Service()
export class DataBaseService<T, modelTypes = EnumType<T>> {
  #cs: DBConnectionService;
  dataBase: any;
  models: Partial<Record<string, any>> = {};

  constructor() {
    this.#cs = Container.get(DBConnectionService);
  }

  init = async (connectionPath: string, models: Record<string, any>) => {
    this.models = models;
    await this.#connectDataBase(
      this.#cs.getFullConnectionString(connectionPath)
    );
    this.applyModels(models);
  };

  #connectDataBase = async (cs: string) => {
    this.dataBase = mongoose.createConnection(cs);
  };

  applyModels = (models: Record<string, any>) => {
    Object.entries(models).forEach(([modelType, model]) => {
      this.models[modelType] = this.dataBase.model(modelType, model);
    });
  };

  createEntry = async (model: modelTypes, entry: Record<string, any>) => {
    const newEntry = new this.dataBase.models[model](entry);
    await this.saveEntry(newEntry);
    return newEntry;
  };

  deleteEntry = async (model: modelTypes, id: string) => {
    await this.dataBase.models[model].deleteOne({ _id: id });
  };

  findAndUpdateEntry = async (
    model: modelTypes,
    filter: Record<string, any>,
    update: Record<string, any>
  ) => {
    await this.dataBase.models[model].findOneAndUpdate(filter, update);
  };

  getModel = async (model: modelTypes) => {
    return await this.dataBase.models[model];
  };

  findEntry = async (model: modelTypes, filter: Record<string, any>) => {
    return await this.dataBase.models[model].findOne(filter);
  };

  findEntries = async (model: modelTypes, filter: Record<string, any>) => {
    return await this.dataBase.models[model].find(filter);
  };

  findAllEntries = async (model: modelTypes) => {
    const allEntries = await this.dataBase.models[model].find({});
    return allEntries;
  };

  updateEntry = async (entry: any, update: Record<string, any>) => {
    await entry.updateOne(update);
    await this.saveEntry(entry);
  };

  saveEntry = async (entry: any) => {
    await entry.save();
  };
}
