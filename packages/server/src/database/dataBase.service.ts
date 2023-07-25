require("dotenv").config();
import { WithEmptyObj } from "@parsimony/types";
import { models, modelTypes } from "./models";
import { Service } from "typedi";
import { envIs } from "@parsimony/utilities/dist";
import * as mongoose from "mongoose";

const DEV_CONNECTION_STRING = "mongodb://127.0.0.1:27017/parsimony-02";
const PROD_CONNECTION_STRING = `mongodb+srv://jmilanes:${process.env.MONGO_PW}@parsimonyapp01.xmune.mongodb.net/parsimony?retryWrites=true&w=majority`;

export const CONNECTION_STRING = envIs("prod")
  ? PROD_CONNECTION_STRING
  : DEV_CONNECTION_STRING;

@Service()
export class DataBaseService {
  dataBase: any;
  models: WithEmptyObj<Record<modelTypes, any>> = {};
  #connectionString?: string;

  constructor() {}

  init = async (cs: string) => {
    this.#connectionString = cs;
    this.dataBase = mongoose;
    this.applyModels(models);
    await this.#connectDataBase();
  };

  #connectDataBase = async () => {
    await this.dataBase.connect(this.#connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  };

  applyModels = (models: Record<modelTypes, any>) => {
    Object.entries(models).forEach(([modelType, model]) => {
      this.models[modelType as modelTypes] = this.dataBase.model(
        modelType,
        model
      );
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
