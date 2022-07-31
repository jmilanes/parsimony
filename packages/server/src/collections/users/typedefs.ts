const { gql } = require("apollo-server");

export default gql`
  scalar Date

  type User {
    id: ID!
    updated_at: Date
    created_at: Date
    schoolId: String
    timeZone: String
    roles: [String]
    type: String
    documents: [String]
    password: String
    email: String
    firstName: String
    lastName: String
    dateOfBirth: Date
    phone: String
    contacts: [ID]
  }

  input CreateUserPayload {
    schoolId: String
    timeZone: String
    roles: [String]
    type: String
    documents: [String]
    password: String
    email: String
    firstName: String
    lastName: String
    dateOfBirth: Date
    phone: String
    contacts: [ID]
  }

  input DeleteUserPayload {
    id: ID!
  }

  input GetUserPayload {
    id: ID!
  }

  input UpdateUserPayload {
    id: ID!
    schoolId: String
    timeZone: String
    roles: [String]
    type: String
    documents: [String]
    password: String
    email: String
    firstName: String
    lastName: String
    dateOfBirth: Date
    phone: String
    contacts: [ID]
  }

  type Query {
    getAllUsers: [User]
    getUser(payload: GetUserPayload): User
  }

  type Mutation {
    createUser(payload: CreateUserPayload): User
    deleteUser(payload: DeleteUserPayload): ID
    updateUser(payload: UpdateUserPayload): User
  }
`;

// TODO
// Set up FE to handle async users
// Change string arrays to ID
// is typing
// auto generate payload types from type defs
// Chat service more observable thing

// UI
// Testing (graphQL and Observable in service)
// Errors

//* GOALz
// Close loop on chat (with testing)
// Get one FE collection into mongo/graphQL land
