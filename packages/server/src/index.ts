const mongoose = require("mongoose");

import { BroadcastService, DataBaseService, models } from "./database";
import graphQlConfig, { ICreateResolverParams } from "./collections";

const broadcastService = new BroadcastService(8080);
broadcastService.init();

const { ApolloServer } = require("apollo-server");

const CONNECTION_STRING = "mongodb://127.0.0.1:27017/parsimony-02";
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
