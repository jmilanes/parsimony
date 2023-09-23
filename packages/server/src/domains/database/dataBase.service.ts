require("dotenv").config();
import { Container, Service } from "typedi";
import { envIs } from "@parsimony/utilities/dist";
import * as mongoose from "mongoose";

const DEV_DBS = {
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

export const TEST_MEMORY_SERVER_TOKEN = "TEST_MEMORY_SERVER_TOKEN";

@Service()
export class DataBaseService<T, modelTypes = EnumType<T>> {
  dataBase: any;
  models: Partial<Record<string, any>> = {};

  init = async (cs: string, models: Record<string, any>) => {
    // TODO: PUT THIS BACK BUT LIKE BETTER...
    // const testConnectionString = Container.get(
    //   TEST_MEMORY_SERVER_TOKEN
    // ) as string;

    this.models = models;
    await this.#connectDataBase(
      getConnectionStringByEnv(cs)
      // testConnectionString || getConnectionStringByEnv(cs)
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
