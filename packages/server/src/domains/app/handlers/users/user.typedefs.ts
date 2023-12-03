const { gql } = require("apollo-server");

export default gql`
  scalar Date

  type User {
    schoolId: String
    timeZone: String
    roles: [String]
    type: String
    documents: [String]
    email: String
    firstName: String
    lastName: String
    dateOfBirth: Date
    phone: String
    contacts: [ID]
    clients: [ID]
    programs: [ID]
    actionItems: [ID]
    threadDisplayNameName: String
    avatar: String
    color: String
    updated_at: Date
    created_at: Date
    serviceProvider: String
  }

  input CreateUserPayload {
    schoolId: String
    timeZone: String
    roles: [String]
    type: String
    documents: [String]
    email: String
    firstName: String
    lastName: String
    dateOfBirth: Date
    phone: String
    contacts: [ID]
    clients: [ID]
    programs: [ID]
    actionItems: [ID]
    threadDisplayNameName: String
    avatar: String
    color: String
    updated_at: Date
    created_at: Date
    serviceProvider: String
  }

  input DeleteUserPayload {
    id: ID!
  }

  input UpdateUserPayload {
    id: ID!
    schoolId: String
    timeZone: String
    roles: [String]
    type: String
    documents: [String]
    email: String
    firstName: String
    lastName: String
    dateOfBirth: Date
    phone: String
    contacts: [ID]
    clients: [ID]
    programs: [ID]
    actionItems: [ID]
    threadDisplayNameName: String
    avatar: String
    color: String
    serviceProvider: String
    updated_at: Date
    created_at: Date
  }

  input GetAllUsersByRelationshipPayload {
    relationshipProperty: String!
    id: ID!
  }

  input GetUserPayload {
    id: ID!
  }

  type Query {
    getAllUsers: [User]
    getUser(payload: GetUserPayload): User
    getAllUsersByRelationship(payload: GetAllUsersByRelationshipPayload): [User]
  }

  type Mutation {
    createUser(payload: CreateUserPayload): User
    deleteUser(payload: DeleteUserPayload): ID
    updateUser(payload: UpdateUserPayload): User
  }
`;
