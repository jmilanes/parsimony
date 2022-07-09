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

  input CreateThreadPayload {
    name: String
    subscribers: [String]
  }

  input DeletePayload {
    id: ID
  }

  input UpdateThreadPayload {
    id: ID
    subscribers: [String]
    name: String
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

  input EditMessagePayload {
    threadId: ID
    messageId: ID
    value: String
  }
  input DeleteMessagePayload {
    threadId: ID
    messageId: ID
  }

  type Query {
    threads: [Thread]
  }

  type Mutation {
    createThread(payload: CreateThreadPayload): Thread
    deleteThread(payload: DeletePayload): ID
    updateThread(payload: UpdateThreadPayload): Thread
    addMessage(payload: MessagePayload): Thread
    deleteMessage(payload: DeleteMessagePayload): ID
    editMessage(payload: EditMessagePayload): ID
  }
`;

// Users need to go in to db
// Auth service
//    Log in
//    Log out
//    15 min auto log out for prod (if we want)
// fake password for now
// temp log in page

// getUserThreads (only get the threads that a user is subscribed)
// Change string arrays to ID
// is typing

// UI
// Testing
// Errors

//* GOALz
// Close loop on chat (with testing)
// Get one FE collection into mongo/graphQL land
