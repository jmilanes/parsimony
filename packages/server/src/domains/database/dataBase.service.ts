require("dotenv").config();
import { Service } from "typedi";
import { envIs } from "@parsimony/utilities/dist";
import * as mongoose from "mongoose";

const DEV_DBS = {
  //This one can get removed once it is in the school version
  "xmune.parsimonyapp01": "parsimony-02",
  "f034n9b.parsimonySchools": "parsimonySchools"
};

export const getConnectionStringByEnv = (dbConnection: string) => {
  if (!envIs("prod")) {
    //@ts-ignore
    const devDb = DEV_DBS[dbConnection];
    return `mongodb://127.0.0.1:27017/${devDb ? devDb : dbConnection}`;
  }
  return `mongodb+srv://jmilanes:${process.env.MONGO_PW}@${dbConnection}.mongodb.net/parsimony?retryWrites=true&w=majority`;
};

type EnumType<T> = {
  [K in keyof T]: { value: T[K]; label: string };
};

@Service()
export class DataBaseService<T, modelTypes = EnumType<T>> {
  dataBase: any;
  models: Partial<Record<string, any>> = {};

  init = async (cs: string, models: Record<string, any>) => {
    this.models = models;
    await this.#connectDataBase(getConnectionStringByEnv(cs));
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
