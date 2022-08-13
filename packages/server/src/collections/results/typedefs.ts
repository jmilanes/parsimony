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
    ruleCompleteness: Float
    ruleResults: [RuleResult]
  }

  type RuleResult {
    step: Int
    option: RuleResultOption
  }

  type RuleResultOption {
    id: ID
    name: String
    value: Int
  }

  input RuleResultOptionInput {
    id: ID
    name: String
    value: Int
  }

  input RuleResultInput {
    step: Int
    option: RuleResultOptionInput
  }

  input ResultDataInput {
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
  }

  type Mutation {
    createResult(payload: CreateResultPayload): Result
    deleteResult(payload: DeleteResultPayload): ID
    updateResult(payload: UpdateResultPayload): Result
  }
`;
