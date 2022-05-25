import thread from "./schemas/thread";

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
}
