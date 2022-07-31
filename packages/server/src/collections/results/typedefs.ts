const { gql } = require("apollo-server");

export default gql`
  scalar Date

  type Result {
    id: ID!
    programId: ID
    clientId: ID
    programCompleteness: Int
    data: [ResultData]
    updated_at: Date
    created_at: Date
  }

  type ResultData {
    ruleCompleteness: Int
    ruleResults: [RuleResult]
  }

  type RuleResult {
    step: Int
    option: RuleResultOption
  }

  type RuleResultOption {
    name: String
    value: Int
  }

  input RuleResultOptionInput {
    name: String
    value: Int
  }

  input RuleResultInput {
    step: Int
    option: RuleResultOptionInput
  }

  input ResultDataInput {
    ruleCompleteness: Int
    ruleResults: [RuleResultInput]
  }

  input CreateResultPayload {
    programId: ID!
    clientId: ID!
    programCompleteness: Int!
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
    programCompleteness: Int!
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
