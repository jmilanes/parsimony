import { ICreateResolverParams } from "@kmf/types";
import { threadTypeDefs, threadResolvers } from "./threads";

const createResolvers = (params: ICreateResolverParams) => {
  const resolvers = [threadResolvers];
  return resolvers.map((resolver) => resolver(params));
};

const graphQlConfig = { typeDefs: [threadTypeDefs], createResolvers };

export default graphQlConfig;
