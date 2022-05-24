const mongoose = require("mongoose");
import graphQlConfig from "./collections";
import DataBaseController from "./database/connection";

const { ApolloServer } = require("apollo-server");

const CONNECTION_STRING = "mongodb://127.0.0.1:27017/kmf-02";

const db = new DataBaseController(mongoose);
db.connectDataBase(CONNECTION_STRING);
db.createModels();

const server = new ApolloServer({
  typeDefs: graphQlConfig.typeDefs,
  resolvers: graphQlConfig.createResolvers(db)
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
