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
    clients: [ID]
    programs: [ID]
    actionItems: [ID]
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
    clients: [ID]
    programs: [ID]
    actionItems: [ID]
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
    clients: [ID]
    programs: [ID]
    actionItems: [ID]
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
