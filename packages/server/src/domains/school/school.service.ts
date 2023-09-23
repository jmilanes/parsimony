import { Service } from "typedi";
import { SchoolDB } from "./school.db";
import { SCHOOL_MODELS, SchoolModel } from "./school.model";
import { School } from "@parsimony/types";

@Service()
export class SchoolService {
  #map: Record<string, School> = {};
  #db: SchoolDB;

  constructor(db: SchoolDB) {
    this.#db = db;
  }

  init = async () => {
    await this.#db.init("parsimonyschools.f034n9b", {
      [SCHOOL_MODELS.school]: SchoolModel
    });
    await this.#setupMap();
  };

  get map() {
    return this.#map;
  }

  getSchools() {
    return Object.values(this.#map);
  }

  getSchoolIdByNameOrId = (idOrName: string) => {
    return this.getSchools()
      .find((x) => x.name === idOrName || x._id === idOrName)
      ?._id.toString();
  };

  async #setupMap() {
    const schools = await this.#getAllSchools();
    const map: Record<string, School> = {};
    for (const school of schools.map((x: any) => x.toJSON())) {
      map[school._id] = school;
    }
    this.#map = map;
  }

  public getSchoolById = (id: string) => {
    return this.#map[id];
  };

  async #getAllSchools() {
    return await this.#db.findAllEntries(SCHOOL_MODELS.school);
  }

  // TODO: figure out a nice way prob just a node script to create these
  // otherwise just paste in to the
  public addSchool = async (school?: Omit<School, "_id">) => {
    return await this.#db.createEntry(
      SCHOOL_MODELS.school,
      school || {
        name: "test_01",
        primaryEmail: "joey@parsimony.app",
        refreshToken: "fake_01",
        accessToken: "fake_02",
        dbConnection: "test_01",
        clientSeats: 20
      }
    );
  };

  public refreshSchools = async () => {
    await this.#setupMap();
  };
}
