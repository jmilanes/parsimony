import { envIs } from "@parsimony/utilities";
const mongoose = require("mongoose");

import { BroadcastService, DataBaseService, models } from "./database";
import graphQlConfig, { ICreateResolverParams } from "./collections";

const broadcastService = new BroadcastService(8080);
broadcastService.init();

const { ApolloServer } = require("apollo-server");

const DEV_CONNECTION_STRING = "mongodb://127.0.0.1:27017/parsimony-02";
const PROD_CONNECTION_STRING = "mongodb://192.169.0.5:9999/parsimony-02";

const CONNECTION_STRING = envIs("prod")
  ? PROD_CONNECTION_STRING
  : DEV_CONNECTION_STRING;

console.log(
  "🚀 ~ file: index.ts ~ line 16 ~ CONNECTION_STRING",
  CONNECTION_STRING
);
mongoose.Promise = global.Promise;
const db = new DataBaseService(mongoose);
db.connectDataBase(CONNECTION_STRING);
db.createModels(models);

const resolverUtils: ICreateResolverParams = {
  db,
  broadcast: broadcastService.broadcast
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

const server = new ApolloServer({
  namespace: "Parsimony",
  typeDefs: graphQlConfig.typeDefs,
  resolvers: graphQlConfig.createResolvers(resolverUtils)
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
