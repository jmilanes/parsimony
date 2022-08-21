const { gql } = require("apollo-server");

export default gql`
  scalar Date

  type Program {
    id: ID!
    mainProgramId: ID
    title: String
    clientId: ID
    rules: [Rule]
    description: String
    writeAccess: [UserRoles]
    readAccess: [UserRoles]
    type: ProgramTypes
    lastEditedBy: ID
    editedBy: [ID]
    createdBy: ID
    ruleStyle: RuleStyle
    updated_at: Date
    created_at: Date
  }

  type Rule {
    id: ID
    question: String
    description: String
    steps: Int
    options: [RuleOption]
    required: Boolean
    inputType: InputTypes
    valueType: ProgramValueTypes
  }

  type RuleOption {
    id: ID
    name: String
    target: Boolean
  }

  input CreateProgramPayload {
    title: String
    mainProgramId: ID
    clientId: ID
    rules: [RuleInput]
    description: String
    writeAccess: [UserRoles]
    readAccess: [UserRoles]
    type: ProgramTypes
    lastEditedBy: ID
    editedBy: [ID]
    createdBy: ID
    ruleStyle: RuleStyle
  }

  input DeleteProgramPayload {
    id: ID!
  }

  input GetProgramPayload {
    id: ID!
  }

  input UpdateProgramPayload {
    id: ID!
    title: String
    mainProgramId: ID
    clientId: ID
    rules: [RuleInput]
    description: String
    writeAccess: [UserRoles]
    readAccess: [UserRoles]
    type: ProgramTypes
    lastEditedBy: ID
    editedBy: [ID]
    createdBy: ID
    ruleStyle: RuleStyle
  }

  input RuleInput {
    id: ID
    question: String
    description: String
    steps: Int
    options: [RuleOptionInput]
    required: Boolean
    inputType: InputTypes
    valueType: ProgramValueTypes
  }

  input RuleOptionInput {
    id: ID
    name: String
    target: Boolean
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

  enum UserRoles {
    ADMIN
    DIRECTOR
    CLIENT
    GUARDIAN
    EMPLOYEE
  }

  enum ProgramTypes {
    MAIN
    CLIENT
  }

  enum RuleStyle {
    SEPARATE
    GROUP
  }

  type Query {
    getAllPrograms: [Program]
    getProgram(payload: GetProgramPayload): Program
  }

  type Mutation {
    createProgram(payload: CreateProgramPayload): Program
    deleteProgram(payload: DeleteProgramPayload): ID
    updateProgram(payload: UpdateProgramPayload): Program
  }
`;
