import DataBaseController from "../database/dataBaseController";
import { threadTypeDefs, threadResolvers } from "./threads";
import { userTypeDefs, userResolvers } from "./users";
import { programTypeDefs, programResolvers } from "./programs";
import { resultTypeDefs, resultResolvers } from "./results";
import { schoolTypeDefs, schoolResolvers } from "./schools";

export type ICreateResolverParams = {
  db: DataBaseController;
  broadcast: (payload: Record<string, any>) => void;
};

const createResolvers = (params: ICreateResolverParams) => {
  const resolvers = [
    threadResolvers,
    userResolvers,
    programResolvers,
    resultResolvers,
    schoolResolvers
  ];
  return resolvers.map((resolver) => resolver(params));
};

const graphQlConfig = {
  typeDefs: [
    threadTypeDefs,
    userTypeDefs,
    programTypeDefs,
    resultTypeDefs,
    schoolTypeDefs
  ],
  createResolvers
};

export default graphQlConfig;
