import { SchoolService } from "../school/school.service";

require("dotenv").config();
import { QueryService } from "../app/handlers";

import { Service } from "typedi";

const { ApolloServer } = require("apollo-server");

import { BroadcastService, models } from "../database";
import TokensService from "../database/token.service";
import { AppDataGateway } from "../app/app.data.gateway";

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
  #adg: AppDataGateway;
  #ts: TokensService;
  #bs: BroadcastService;
  #qs: QueryService;
  #ss: SchoolService;

  constructor(
    ss: SchoolService,
    adg: AppDataGateway,
    ts: TokensService,
    bs: BroadcastService,
    qs: QueryService
  ) {
    this.#adg = adg;
    this.#ts = ts;
    this.#bs = bs;
    this.#qs = qs;
    this.#ss = ss;
  }

  public start = async () => {
    await this.#ss.init();
    await this.#adg.init();
    this.#ts.init();
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

    // WE can still do the check for the user School
    // DB here and users will have school
    return currentUser;
  };
}
