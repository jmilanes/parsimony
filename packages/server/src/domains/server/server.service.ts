import { SchoolService } from "../school/school.service";

require("dotenv").config();
import { QueryService } from "../app/handlers";

import { Service } from "typedi";

const { ApolloServer } = require("apollo-server");

import { BroadcastService } from "../database";
import TokensService from "../database/token.service";
import { AppDataGateway } from "../app/app.data.gateway";
import { DBConnectionService } from "../database/dbConnecitonService.service";

import EncryptionService from "../database/encryption.service";

import { MOCK_USER } from "../../testUtils/makeMockServer";
import { envIs } from "@parsimony/utilities";

const ignoredAuthorizationQueries = [
  "me(",
  "login(",
  "logout(",
  "requestPasswordReset(",
  "query IntrospectionQuery"
];

export type ServerParams = {
  uri: string;
  encryptionMethod: (pw: string) => string;
  mockAuthContext?: boolean;
  port?: number;
  broadCastPort?: number;
};

@Service()
export default class ServerService {
  server: any;
  #adg: AppDataGateway;
  #ts: TokensService;
  #es: EncryptionService;
  #bs: BroadcastService;
  #qs: QueryService;
  #ss: SchoolService;
  #cs: DBConnectionService;
  #mockAuthContext: boolean;

  constructor(
    ss: SchoolService,
    adg: AppDataGateway,
    ts: TokensService,
    bs: BroadcastService,
    qs: QueryService,
    cs: DBConnectionService,
    es: EncryptionService
  ) {
    this.#adg = adg;
    this.#ts = ts;
    this.#bs = bs;
    this.#qs = qs;
    this.#ss = ss;
    this.#cs = cs;
    this.#es = es;
  }

  public start = async ({
    uri,
    encryptionMethod,
    mockAuthContext = false,
    port,
    broadCastPort
  }: ServerParams) => {
    if (mockAuthContext) {
      this.#mockAuthContext = true;
    }
    await this.#cs.init(uri);
    this.#es.setEncryptMethod(encryptionMethod);
    await this.#ss.init();
    await this.#adg.init();
    this.#bs.init(envIs("prod"), broadCastPort);
    await this.#createServer();
    await this.#listen(port);
  };

  public close = async () => {
    await this.server.stop();
  };

  #listen = async (port: number = 4000) => {
    await this.server.listen(port);
  };

  #createServer = async () => {
    const context = this.#authContext;
    this.server = new ApolloServer({
      namespace: "Parsimony",
      typeDefs: this.#qs.getTypeDefs(),
      resolvers: this.#qs.getResolvers(),
      context
    });
  };

  #authContext = async ({ req }: { req: any }) => {
    if (this.#mockAuthContext) {
      //TODO: Figure out how make driven from FE
      // Would be good to test different roles
      return { currentUser: MOCK_USER };
    }
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
