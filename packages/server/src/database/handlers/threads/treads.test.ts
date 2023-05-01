import resolvers from "./threads.resolvers";
import typeDefs from "./threads.typedefs";

const { ApolloServer } = require("apollo-server");

// **figure out how to create a class for mongo and then provide a simple way to do an object
// **generated one and pass it in to mockCreateResolvers and then it should return the obj that we need if the underlying value is the same
const mockCreateResolvers = (resolvers: any) =>
  resolvers({ db: jest.fn, broadcast: jest.fn });

it("returns hello with the provided name", async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers: mockCreateResolvers(resolvers)
  });

  const result = await testServer.executeOperation({
    query: `query Threads {
      threads {
        id
        name
        subscribers
        messages {
          timeStamp
          value
          dataType
          id
        }
      }
    }`
  });

  // expect(result.errors).toBeUndefined();
  expect(result.data?.hello).toBe("Hello world!");
});
