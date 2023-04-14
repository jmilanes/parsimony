import { serverToken } from "../sever.token";

const mongoose = require("mongoose");
require("dotenv").config();
import { WithEmptyObj } from "@parsimony/types";
import { models, modelTypes } from "./models";
import { Service } from "typedi";
import { envIs } from "@parsimony/utilities/dist";

const DEV_CONNECTION_STRING = "mongodb://127.0.0.1:27017/parsimony-02";
const PROD_CONNECTION_STRING = `mongodb+srv://jmilanes:${process.env.MONGO_PW}@parsimonyapp01.xmune.mongodb.net/parsimony?retryWrites=true&w=majority`;

const CONNECTION_STRING = envIs("prod")
  ? PROD_CONNECTION_STRING
  : DEV_CONNECTION_STRING;

@Service()
export class DataBaseService {
  dataBase: any;
  models: WithEmptyObj<Record<modelTypes, any>>;
  #connectionString: string = CONNECTION_STRING;

  constructor() {
    this.dataBase = mongoose;
    this.models = {};
    this.applyModels(models);
  }

  init = () => {
    this.#connectDataBase();
  };

  #connectDataBase = () => {
    this.dataBase
      .connect(this.#connectionString, {
        useNewUrlParser: true
      })
      .then(() => console.log("Connected to DB!"))
      .catch((e: any) => console.log("DB ERROR", e));
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

  findEntry = async (model: modelTypes, filter: Record<string, any>) => {
    return await this.dataBase.models[model].findOne(filter);
  };

  findEntries = async (model: modelTypes, filter: Record<string, any>) => {
    return await this.dataBase.models[model].find(filter);
  };

  findAllEntries = async (model: modelTypes) => {
    return await this.dataBase.models[model].find({});
  };

  updateEntry = async (entry: any, update: Record<string, any>) => {
    await entry.updateOne(update);
    await this.saveEntry(entry);
  };

  saveEntry = async (entry: any) => {
    await entry.save();
  };
}
