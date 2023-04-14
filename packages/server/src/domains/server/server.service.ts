import { serverToken } from "../../sever.token";

require("dotenv").config();
import { QueryService } from "../../collections";

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

  public start = () => {
    this.db.init();
    this.bs.init();
    this.#createServer();
    this.#listen();
  };

  #listen = () => {
    this.server.listen().then(({ url }: { url: string }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  };

  #createServer = () => {
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
    return { currentUser };
  };
}
