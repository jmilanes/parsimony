import thread from "./schemas/thread";

export enum modelTypes {
  thread = "thread"
}

export default class DataBaseController {
  dataBase: any;
  models: Record<string, any>;
  constructor(dataBase: any) {
    this.dataBase = dataBase;
    this.models = {};
  }

  connectDataBase(connectionString: string) {
    this.dataBase.connect(connectionString, {
      useNewUrlParser: true
    });
  }

  createModels() {
    this.models.Thread = this.dataBase.model("thread", thread);
  }

  async createEntry(model: modelTypes, entry: Record<string, any>) {
    const thread = new this.dataBase.models[model](entry);
    await thread.save();
    return thread;
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
}
