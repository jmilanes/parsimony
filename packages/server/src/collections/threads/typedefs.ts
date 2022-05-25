const { gql } = require("apollo-server");

export default gql`
  scalar Date

  type Thread {
    id: ID!
    name: String
    subscribers: [String]
    messages: [Message]
    isTyping: [String]
  }

  type Message {
    id: ID!
    dataType: String
    value: String
    timeStamp: Date
  }

  input IMessage {
    dataType: String
    value: String
    timeStamp: Date
  }

  input ICreatePayload {
    name: String
    subscribers: [String]
    message: IMessage
  }

  type Query {
    threads: [Thread]
  }
  type Mutation {
    createThread(payload: ICreatePayload): Thread
  }
`;
