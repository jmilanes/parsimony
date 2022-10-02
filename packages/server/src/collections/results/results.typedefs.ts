const { gql } = require("apollo-server");

export default gql`
  scalar Date

  type Result {
    id: ID!
    programId: ID
    clientId: ID
    programCompleteness: Float
    data: [ResultData]
    updated_at: Date
    created_at: Date
  }

  type ResultData {
    ruleId: ID
    ruleCompleteness: Float
    ruleResults: [RuleResult]
  }

  type RuleResult {
    step: Int
    targetId: ID
    completed: Boolean
    option: RuleResultOption
  }

  type RuleResultOption {
    id: ID
    name: String
    target: Boolean
  }

  input RuleResultOptionInput {
    id: ID
    name: String
    target: Boolean
  }

  input RuleResultInput {
    step: Int
    option: RuleResultOptionInput
    completed: Boolean
    targetId: ID
  }

  input ResultDataInput {
    ruleId: ID
    ruleCompleteness: Float
    ruleResults: [RuleResultInput]
  }

  input CreateResultPayload {
    programId: ID!
    clientId: ID!
    programCompleteness: Float!
    data: [ResultDataInput]
  }

  input DeleteResultPayload {
    id: ID!
  }

  input GetResultPayload {
    id: ID!
  }

  input UpdateResultPayload {
    id: ID!
    programId: ID!
    clientId: ID!
    programCompleteness: Float!
    data: [ResultDataInput]
  }

  input GetAllResultsByRelationshipPayload {
    relationshipProperty: String!
    id: ID!
  }

  enum ProgramValueTypes {
    STRING
    NUMBER
    DATE
    BOOLEAN
  }

  enum InputTypes {
    RADIO
    TEXT
  }

  type Query {
    getAllResults: [Result]
    getResult(payload: GetResultPayload): Result
    getAllResultsByRelationship(
      payload: GetAllResultsByRelationshipPayload
    ): [Result]
  }

  type Mutation {
    createResult(payload: CreateResultPayload): Result
    deleteResult(payload: DeleteResultPayload): ID
    updateResult(payload: UpdateResultPayload): Result
  }
`;
