import { threadTypeDefs, threadResolvers } from "./threads";

const createResolvers = (db: any) => {
  const resolvers = [threadResolvers];
  return resolvers.map((resolver) => resolver(db));
};

const graphQlConfig = { typeDefs: [threadTypeDefs], createResolvers };

export default graphQlConfig;
