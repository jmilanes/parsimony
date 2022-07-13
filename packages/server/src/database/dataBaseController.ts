import { WithEmptyObj } from "@parsimony/types/src";
import { modelTypes } from "./models";

export default class DataBaseController {
  dataBase: any;
  models: WithEmptyObj<Record<modelTypes, any>>;
  constructor(dataBase: any) {
    this.dataBase = dataBase;
    this.models = {};
  }

  connectDataBase(connectionString: string) {
    this.dataBase.connect(connectionString, {
      useNewUrlParser: true
    });
  }

  createModels(models: Record<modelTypes, any>) {
    Object.entries(models).forEach(([modelType, model]) => {
      this.models[modelType as modelTypes] = this.dataBase.model(
        modelType,
        model
      );
    });
  }

  async createEntry(model: modelTypes, entry: Record<string, any>) {
    const newEntry = new this.dataBase.models[model](entry);
    await this.saveEntry(newEntry);
    return newEntry;
  }

  async deleteEntry(model: modelTypes, id: string) {
    await this.dataBase.models[model].remove({ _id: id });
  }

  async findAndUpdateEntry(
    model: modelTypes,
    filter: Record<string, any>,
    update: Record<string, any>
  ) {
    await this.dataBase.models[model].findOneAndUpdate(filter, update);
  }

  async findEntry(model: modelTypes, filter: Record<string, any>) {
    return await this.dataBase.models[model].findOne(filter);
  }

  async findEntries(model: modelTypes, filter: Record<string, any>) {
    return await this.dataBase.models[model].find(filter);
  }

  async updateEntry(entry: any, update: Record<string, any>) {
    await entry.updateOne(update);
  }
  async saveEntry(entry: any) {
    await entry.save();
  }
}
