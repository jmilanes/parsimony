import { Service } from "typedi";
import { SchoolDB } from "./school.db";
import { SchoolModel } from "./school.model";

@Service()
export class SchoolService {
  #db: SchoolDB;

  constructor(db: SchoolDB) {
    this.#db = db;
  }

  init = async () => {
    await this.#db.init("parsimony_schools", { school: SchoolModel });
  };
}
