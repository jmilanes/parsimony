import { Service } from "typedi";
import { SchoolDB } from "./school.db";
import { SCHOOL_MODELS, SchoolModel } from "./school.model";

@Service()
export class SchoolService {
  #db: SchoolDB;

  constructor(db: SchoolDB) {
    this.#db = db;
  }

  init = async () => {
    await this.#db.init("parsimonySchools", {
      [SCHOOL_MODELS.school]: SchoolModel
    });
  };

  // THIS WOULD BE A GREAT PLACE TO ADD TYPE DI
  // (or something else to see what that would look like in a control space)
  public addSchool = async () => {
    await this.#db.createEntry(SCHOOL_MODELS.school, {
      name: "test_01",
      refreshToken: "fake_01",
      accessToken: "fake_02",
      connectionString: "test_01",
      clientSeats: 20
    });
  };
}
