require("dotenv").config();
import { Injectable } from "@nestjs/common";
import { envIs } from "@parsimony/utilities/dist";

const DEV_DBS = {
  "parsimonyschools.f034n9b": "parsimonySchools"
};

export const applyProductionURI = (connectionPath: string) =>
  `mongodb+srv://jmilanes:${process.env.MONGO_PW}@${connectionPath}.mongodb.net/parsimony?retryWrites=true&w=majority`;

@Injectable()
export class DBConnectionService {
  #connection: any;

  public async init(connection: string) {
    if (!envIs("prod")) {
      this.#connection = connection;
    }
  }

  set connection(connection: string) {
    this.#connection = connection;
  }

  public getFullConnectionString = (connectionPath: string) => {
    if (!envIs("prod")) {
      //@ts-ignore
      const devDb = DEV_DBS[connectionPath];
      return `${this.#connection}${devDb ? devDb : connectionPath}`;
    }
    return this.#getProdConnectionString(connectionPath);
  };

  #getProdConnectionString(connectionPath: string) {
    return applyProductionURI(connectionPath);
  }
}
