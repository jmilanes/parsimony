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

  input IMessagePayload {
    threadId: ID!
    dataType: String
    value: String
    userId: String
  }

  input ICreatePayload {
    name: String
    subscribers: [String]
  }

  input IDeletePayload {
    id: ID
  }

  type Query {
    threads: [Thread]
  }
  type Mutation {
    createThread(payload: ICreatePayload): Thread
    deleteThread(payload: IDeletePayload): ID
    addMessage(payload: IMessagePayload): ID
  }
`;
