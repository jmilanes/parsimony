import DataBaseController from "../database/dataBase.controller";
import { threadTypeDefs, threadResolvers } from "./threads";
import { userTypeDefs, userResolvers } from "./users";
import { programTypeDefs, programResolvers } from "./programs";
import { resultTypeDefs, resultResolvers } from "./results";
import { schoolTypeDefs, schoolResolvers } from "./schools";
import { documentTypeDefs, documentResolvers } from "./documents";
import { eventTypeDefs, eventResolvers } from "./events";

export type ICreateResolverParams = {
  db: DataBaseController;
  broadcast: (payload: Record<string, any>) => void;
};

const createResolvers = (params: ICreateResolverParams) => {
  const resolvers = [
    threadResolvers,
    userResolvers.getResolver(),
    programResolvers.getResolver(),
    resultResolvers.getResolver(),
    schoolResolvers.getResolver(),
    documentResolvers.getResolver(),
    eventResolvers.getResolver()
  ];
  return resolvers.map((resolver) => resolver(params));
};

const graphQlConfig = {
  typeDefs: [
    threadTypeDefs,
    userTypeDefs,
    programTypeDefs,
    resultTypeDefs,
    schoolTypeDefs,
    documentTypeDefs,
    eventTypeDefs
  ],
  createResolvers
};

export default graphQlConfig;
