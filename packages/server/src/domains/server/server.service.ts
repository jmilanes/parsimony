require("dotenv").config();
import { QueryService } from "../../database/handlers";

import { Inject, Service } from "typedi";

const { ApolloServer } = require("apollo-server");

import { BroadcastService, DataBaseService } from "../../database";
import TokensService from "../../database/token.service";

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

  // @ts-ignore
  @Inject(() => DataBaseService)
  readonly db: DataBaseService;

  // @ts-ignore
  @Inject(() => TokensService)
  readonly ts: TokensService;

  // @ts-ignore
  @Inject(() => BroadcastService)
  readonly bs: BroadcastService;

  // @ts-ignore
  @Inject(() => QueryService)
  readonly qs: QueryService;

  constructor(
    db: DataBaseService,
    ts: TokensService,
    bs: BroadcastService,
    qs: QueryService
  ) {
    this.db = db;
    this.ts = ts;
    this.bs = bs;
    this.qs = qs;
  }

  public start = async (connectionString: string) => {
    await this.db.init(connectionString);
    this.bs.init();
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
      typeDefs: this.qs.getTypeDefs(),
      resolvers: this.qs.getResolvers(),
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
    const currentUser = await this.ts.verifyAccessToken(accessToken);
    return currentUser;
  };
}
