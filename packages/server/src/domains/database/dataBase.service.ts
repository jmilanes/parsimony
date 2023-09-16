require("dotenv").config();
import { Service } from "typedi";
import { envIs } from "@parsimony/utilities/dist";
import * as mongoose from "mongoose";

export const getConnectionStringByEnv = (name: string, driverId: string) => {
  if (!envIs("prod")) {
    return `mongodb://127.0.0.1:27017/${
      // TODO: Remove this hack
      name === "parsimonyapp01" ? "parsimony-02" : name
    }`;
  }
  return `mongodb+srv://jmilanes:${process.env.MONGO_PW}@${name}.${driverId}.mongodb.net/parsimony?retryWrites=true&w=majority`;
};

type EnumType<T> = {
  [K in keyof T]: { value: T[K]; label: string };
};

@Service()
export class DataBaseService<T, modelTypes = EnumType<T>> {
  dataBase: any;
  models: Partial<Record<string, any>> = {};

  init = async (cs: string, models: Record<string, any>, driverId: string) => {
    this.models = models;
    await this.#connectDataBase(getConnectionStringByEnv(cs, driverId));
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
