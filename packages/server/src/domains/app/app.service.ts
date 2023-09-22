import { Service } from "typedi";
import { AppDB } from "./app.database";
import { models } from "./models";

@Service()
export class AppService {
  #db: AppDB;

  constructor(db: AppDB) {
    this.#db = db;
  }

  init = async () => {
    await this.#db.init("xmune.parsimonyapp01", models);
  };
}
