const { gql } = require("apollo-server");

export default gql`
  scalar Date

  type Thread {
    id: ID!
    name: String!
    subscribers: [Subscriber]!
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

  type Subscriber {
    id: ID!
    displayName: String
  }

  input GetThreadByUserIdPayload {
    id: ID!
  }

  input CreateThreadPayload {
    name: String!
    subscribers: [SubscriberInput]!
  }

  input DeleteThreadPayload {
    id: ID!
  }

  input UpdateThreadPayload {
    id: ID!
    subscribers: [SubscriberInput]!
    name: String!
  }

  input SubscriberInput {
    id: ID!
    displayName: String
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
    getThreadsByUserId(payload: GetThreadByUserIdPayload): [Thread]
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
