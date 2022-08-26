const mongoose = require("mongoose");
import { BroadcastController } from "./broadcast";
import graphQlConfig, { ICreateResolverParams } from "./collections";
import DataBaseController from "./database/dataBase.controller";
import models from "./database/models";

const broadCastController = new BroadcastController(9999);
broadCastController.init();

const { ApolloServer } = require("apollo-server");

const CONNECTION_STRING =
  "mongodb://127.0.0.1:27017/parsimony?authSource=admin";
mongoose.Promise = global.Promise;
const db = new DataBaseController(mongoose);
db.connectDataBase(CONNECTION_STRING);
db.createModels(models);

const resolverUtils: ICreateResolverParams = {
  db,
  broadcast: broadCastController.broadcast
};

// makeExecutableSchema
const server = new ApolloServer({
  namespace: "Parsimony",
  typeDefs: graphQlConfig.typeDefs,
  resolvers: graphQlConfig.createResolvers(resolverUtils)
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
