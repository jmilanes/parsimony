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

// TODO
// Make sure we are not coupling to much to GraphQL
//  ** One way to do this to see if your CRUD generator will work if you move it up
//  ** See if the in between layer can be swapped with the graph ql fetches
//  ** Keep in mind chat and call will prob need to extend
// Potential move types/enum out of APP
// Compile your types into graph
// Look into lerna, shared ts cofigs, and make sure workspaces is done right
