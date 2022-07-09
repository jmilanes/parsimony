import DataBaseController from "../database/dataBaseController";
import { threadTypeDefs, threadResolvers } from "./threads";

export type ICreateResolverParams = {
  db: DataBaseController;
  broadcast: (payload: Record<string, any>) => void;
};

const createResolvers = (params: ICreateResolverParams) => {
  const resolvers = [threadResolvers];
  return resolvers.map((resolver) => resolver(params));
};

const graphQlConfig = { typeDefs: [threadTypeDefs], createResolvers };

export default graphQlConfig;
