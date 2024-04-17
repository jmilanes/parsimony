require("dotenv").config();

import { SchoolService } from "../school/school.service";

import TokenService from "../database/token.service";
import { DBConnectionService } from "../database/dbConnecitonService.service";

import EncryptionService from "../database/encryption.service";

import { Injectable } from "@nestjs/common";

export type ServerParams = {
  uri: string;
  encryptionMethod: (pw: string) => string;
  mockAuthContext?: boolean;
  port?: number;
};

@Injectable()
export default class ServerService {
  server: any;
  #ts: TokenService;
  #es: EncryptionService;
  #ss: SchoolService;
  #cs: DBConnectionService;
  #mockAuthContext: boolean;

  constructor(
    ss: SchoolService,
    ts: TokenService,
    cs: DBConnectionService,
    es: EncryptionService
  ) {
    this.#ts = ts;
    this.#ss = ss;
    this.#cs = cs;
    this.#es = es;
  }

  public start = async ({
    uri,
    encryptionMethod,
    mockAuthContext = false
  }: ServerParams) => {
    if (mockAuthContext) {
      this.#mockAuthContext = true;
    }
    await this.#cs.init(uri);
    this.#es.setEncryptMethod(encryptionMethod);
    await this.#ss.init();
  };

  public close = async () => {
    await this.server.stop();
  };
}
