const { gql } = require("apollo-server");

export default gql`
  scalar Date

  type School {
    id: ID!
    name: String
    domain: String
    userCount: Int
    accessTokens: [String]
    updated_at: Date
    created_at: Date
  }

  input CreateSchoolPayload {
    name: String
    domain: String
    userCount: Int
    accessTokens: [String]
  }

  input DeleteSchoolPayload {
    id: ID!
  }

  input GetSchoolPayload {
    id: ID!
  }

  input UpdateSchoolPayload {
    id: ID!
    name: String
    domain: String
    userCount: Int
    accessTokens: [String]
  }

  input GetAllSchoolByRelationshipPayload {
    relationshipProperty: String!
    id: ID!
  }

  type Query {
    getAllSchools: [School]
    getSchool(payload: GetSchoolPayload): School
    getAllSchoolsByRelationship(
      payload: GetAllSchoolByRelationshipPayload
    ): [School]
  }

  type Mutation {
    createSchool(payload: CreateSchoolPayload): School
    deleteSchool(payload: DeleteSchoolPayload): ID
    updateSchool(payload: UpdateSchoolPayload): School
  }
`;
