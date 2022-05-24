const { gql } = require("apollo-server");

export default gql`
  type Thread {
    id: ID!
    name: String!
  }

  type Query {
    threads: [Thread]
  }
  type Mutation {
    createThread(name: String!): Thread
  }
`;
