const { gql } = require("apollo-server");
export default gql`
  scalar Date

  type Result {
    id: ID!
    programId: ID
    clientId: ID
    type: ResultType
    programCompleteness: Float
    behaviorData: BehaviorData
    data: [ResultData]
    updated_at: Date
    created_at: Date
  }

  type BehaviorData {
    type: BehaviorType
    result: Int
    tally: Int
    duration: Int
    intervalPassed: Boolean
  }

  type ResultData {
    targetId: ID
    targetCompleteness: Float
    targetResults: [TargetResult]
  }

  type TargetResult {
    trial: Int
    targetOptionId: ID
    completed: Boolean
    option: TargetResultOption
  }

  type TargetResultOption {
    id: ID
    name: String
    target: Boolean
  }

  input TargetResultOptionInput {
    id: ID
    name: String
    target: Boolean
  }

  input TargetResultInput {
    trial: Int
    option: TargetResultOptionInput
    completed: Boolean
    targetOptionId: ID
  }

  input BehaviorDataInput {
    type: BehaviorType
    result: Int
    tally: Int
    duration: Int
    intervalPassed: Boolean
  }

  input ResultDataInput {
    targetId: ID
    targetCompleteness: Float
    targetResults: [TargetResultInput]
  }

  input CreateResultPayload {
    programId: ID!
    clientId: ID!
    programCompleteness: Float!
    behaviorData: BehaviorDataInput
    data: [ResultDataInput]
    updated_at: Date
    created_at: Date
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
    behaviorData: BehaviorDataInput
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

  enum BehaviorType {
    TIME
    TALLY
    INTERVAL
  }
  enum ResultType {
    TRIAL
    BEHAVIOR
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
