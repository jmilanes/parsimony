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
    userId: String
  }

  input MessagePayload {
    dataType: String
    value: String
    userId: String
  }

  input MessagePayload {
    threadId: ID
    message: MessagePayload
  }

  input CreateThreadPayload {
    name: String
    subscribers: [String]
  }

  input DeletePayload {
    id: ID
  }

  type Query {
    threads: [Thread]
  }

  type Mutation {
    createThread(payload: CreateThreadPayload): Thread
    deleteThread(payload: DeletePayload): ID
    addMessage(payload: MessagePayload): Thread
  }
`;
