import { Container, Service } from "typedi";

import { DataBaseService } from "../database/dataBase.service";
import { getFreshModels, models, modelTypes } from "./models";
import { SchoolService } from "../school/school.service";

@Service()
export class AppDataGateway {
  #gateways: Record<string, DataBaseService<modelTypes>> = {};
  #ss: SchoolService;

  constructor() {
    this.#ss = Container.get(SchoolService);
  }

  public init = async () => {
    await this.#setUpGateways();
  };

  public dbBySchoolId = (id: string) => {
    return this.#gateways[id];
  };

  async #setUpGateways() {
    for (const school of this.#ss?.getSchools() || []) {
      const db = new DataBaseService<modelTypes>();
      await db.init(school.dbConnection, getFreshModels());
      this.#gateways[school._id] = db;
    }
  }
}
