import { DataBaseService } from "../database/dataBase.service";
import { getFreshModels, modelTypes } from "./models";
import { SchoolService } from "../school/school.service";
import { Injectable } from "@nestjs/common";
import { DBConnectionService } from "../database/dbConnecitonService.service";

@Injectable()
export class AppDataGateway {
  #gateways: Record<string, DataBaseService<modelTypes>> = {};
  #ss: SchoolService;
  #dbc: DBConnectionService;

  constructor(ss: SchoolService, dbc: DBConnectionService) {
    this.#ss = ss;
    this.#dbc = dbc;
  }

  public init = async () => {
    await this.#setUpGateways();
  };

  public dbBySchoolId = (id: string) => {
    return this.#gateways[id];
  };

  async #setUpGateways() {
    for (const school of this.#ss?.getSchools() || []) {
      const db = new DataBaseService<modelTypes>(this.#dbc);
      await db.init(school.dbConnection, getFreshModels());
      this.#gateways[school._id] = db;
    }
  }
}
