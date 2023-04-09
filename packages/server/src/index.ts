require("dotenv").config();
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");

import { BroadcastService, DataBaseService, models } from "./database";
import graphQlConfig, { ICreateResolverParams } from "./collections";
import { envIs } from "@parsimony/utilities";
import TokensService from "./database/token.service";

const isProduction = envIs("prod");

const broadcastService = new BroadcastService();

broadcastService.init();

const DEV_CONNECTION_STRING = "mongodb://127.0.0.1:27017/parsimony-02";
const PROD_CONNECTION_STRING = `mongodb+srv://jmilanes:${process.env.MONGO_PW}@parsimonyapp01.xmune.mongodb.net/parsimony?retryWrites=true&w=majority`;

const CONNECTION_STRING = isProduction
  ? PROD_CONNECTION_STRING
  : DEV_CONNECTION_STRING;

mongoose.Promise = global.Promise;
const db = new DataBaseService(mongoose);
db.connectDataBase(CONNECTION_STRING);
db.createModels(models);

const tokenService = new TokensService(db);

const resolverUtils: ICreateResolverParams = {
  db,
  broadcast: broadcastService.broadcast,
  tokenService
};

//***** TESTING *****/
// * I think can find a to do a few things here
// * There must be a way to mock Mondo DB (TEMP storage) and then I can create a new apolloServer with that mock
// * Create a Test Server util
// * Use close to all the request so you only have to test in one place
// * Feel like you can use this to do all your other react testing ()

// * It would be cool if you could do it with no server running but at this stage it is fine since
// * you are not hooking it up to CI and can just running on you machine (if you find a way that would be dope)

// * IDK How to test sockets but sure the is a way...

// TODO: This needs to be better
const ignoredAuthorizationQueries = [
  "me(",
  "login(",
  "logout(",
  "resetPassword(",
  "query IntrospectionQuery"
];

const server = new ApolloServer({
  namespace: "Parsimony",
  typeDefs: graphQlConfig.typeDefs,
  resolvers: graphQlConfig.createResolvers(resolverUtils),
  async context({ req }: { req: any }) {
    const isIgnoredAuthorizationQuery = ignoredAuthorizationQueries.some(
      (ignoredQuery) => req.body.query.includes(ignoredQuery)
    );

    if (isIgnoredAuthorizationQuery) {
      return {};
    }
    const accessToken = req.headers.authorization.split(" ")[1];
    const currentUser = await tokenService.verifyAccessToken(accessToken);
    return { currentUser };
  }
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
