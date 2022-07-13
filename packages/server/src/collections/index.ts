import DataBaseController from "../database/dataBaseController";
import { threadTypeDefs, threadResolvers } from "./threads";
import { userTypeDefs, userResolvers } from "./users";

export type ICreateResolverParams = {
  db: DataBaseController;
  broadcast: (payload: Record<string, any>) => void;
};

const createResolvers = (params: ICreateResolverParams) => {
  const resolvers = [threadResolvers, userResolvers];
  return resolvers.map((resolver) => resolver(params));
};

const graphQlConfig = {
  typeDefs: [threadTypeDefs, userTypeDefs],
  createResolvers
};

export default graphQlConfig;
