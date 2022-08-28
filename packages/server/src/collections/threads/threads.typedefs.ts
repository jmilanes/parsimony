const { gql } = require("apollo-server");

export default gql`
  scalar Date

  type Thread {
    id: ID!
    name: String!
    subscribers: [String]!
    messages: [Message]!
    isTyping: [String]!
  }

  type Message {
    id: ID!
    dataType: String!
    value: String!
    timeStamp: Date!
    userId: String!
  }

  input CreateThreadPayload {
    name: String!
    subscribers: [String]!
  }

  input DeleteThreadPayload {
    id: ID!
  }

  input UpdateThreadPayload {
    id: ID!
    subscribers: [String]!
    name: String!
  }

  input MessagePayload {
    id: ID
    dataType: String
    value: String
    userId: String
    timeStamp: Date
  }

  input AddMessagePayload {
    threadId: ID!
    message: MessagePayload!
  }

  input EditMessagePayload {
    threadId: ID!
    messageId: ID!
    value: String!
  }
  input DeleteMessagePayload {
    threadId: ID!
    messageId: ID!
  }

  type Query {
    threads: [Thread]
  }

  type Mutation {
    createThread(payload: CreateThreadPayload): Thread
    deleteThread(payload: DeleteThreadPayload): ID
    updateThread(payload: UpdateThreadPayload): Thread
    addMessage(payload: AddMessagePayload): Thread
    deleteMessage(payload: DeleteMessagePayload): ID
    editMessage(payload: EditMessagePayload): ID
  }
`;
