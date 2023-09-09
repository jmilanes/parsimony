import { SchoolService } from "../school/school.service";

require("dotenv").config();
import { QueryService } from "../../database/handlers";

import { Service } from "typedi";

const { ApolloServer } = require("apollo-server");

import { BroadcastService, models } from "../../database";
import TokensService from "../../database/token.service";
import { AppDB } from "../../database/app.database";

const ignoredAuthorizationQueries = [
  "me(",
  "login(",
  "logout(",
  "resetPassword(",
  "query IntrospectionQuery"
];

@Service()
export default class ServerService {
  server: any;
  #appDb: AppDB;
  #ts: TokensService;
  #bs: BroadcastService;
  #qs: QueryService;
  #ss: SchoolService;

  constructor(
    appDB: AppDB,
    ts: TokensService,
    bs: BroadcastService,
    qs: QueryService,
    ss: SchoolService
  ) {
    this.#appDb = appDB;
    this.#ts = ts;
    this.#bs = bs;
    this.#qs = qs;
    this.#ss = ss;
  }

  public start = async () => {
    await this.#appDb.init("parsimonyapp01", models);
    await this.#ss.init();
    this.#bs.init();
    await this.#createServer();
    await this.#listen();
  };

  public close = async () => {
    await this.server.stop();
  };

  #listen = async () => {
    await this.server.listen();
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
    const isIgnoredAuthorizationQuery = ignoredAuthorizationQueries.some(
      (ignoredQuery) => req.body.query.includes(ignoredQuery)
    );
    if (isIgnoredAuthorizationQuery) {
      return {};
    }

    const accessToken = req.headers.authorization.split(" ")[1];
    const currentUser = await this.#ts.verifyAccessToken(accessToken);
    return currentUser;
  };
}
