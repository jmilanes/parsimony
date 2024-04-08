require("dotenv").config();

import { SchoolService } from "../school/school.service";

import TokenService from "../database/token.service";
import { DBConnectionService } from "../database/dbConnecitonService.service";

import EncryptionService from "../database/encryption.service";

import { MOCK_USER } from "../../testUtils/makeMockServer";

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

  #authContext = async ({ req }: { req: any }) => {
    if (this.#mockAuthContext) {
      //TODO: Figure out how make driven from FE
      // Would be good to test different roles
      return { currentUser: MOCK_USER };
    }
    const ignoredAuthorizationQueries = [
      "me(",
      "login(",
      "logout(",
      "requestPasswordReset(",
      "query IntrospectionQuery"
    ];

    const isIgnoredAuthorizationQuery = ignoredAuthorizationQueries.some(
      (ignoredQuery) => req.body.query.includes(ignoredQuery)
    );
    if (isIgnoredAuthorizationQuery) {
      return {};
    }

    const accessToken = req.headers.authorization.split(" ")[1];
    const currentUser = await this.#ts.verifyAccessToken(accessToken);

    // WE can still do the check for the user School
    // DB here and users will have school
    return currentUser;
  };
}
