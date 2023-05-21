const { gql } = require("apollo-server");

export default gql`
  scalar Date

  type Program {
    id: ID!
    mainProgramId: ID
    title: String
    clientId: ID
    targets: [Target]
    description: String
    writeAccess: [UserRoles]
    readAccess: [UserRoles]
    type: ProgramTypes
    lastEditedBy: ID
    editedBy: [ID]
    createdBy: ID
    trials: Int
    materials: String
    targetStyle: TargetStyle
    updated_at: Date
    created_at: Date
    mastered: Boolean
    targetOptions: [TargetOption]
    category: ProgramCategories
    chainingDirection: TrialChainingDirections
    currentChainTarget: ID
    masterTargetPercent: Int
    masterTargetCount: Int
    subscribers: [ID]
    collectionId: ID!
  }

  type Target {
    id: ID
    title: String
    description: String
    required: Boolean
    inputType: InputTypes
    valueType: ProgramValueTypes
    currentMasterCount: Int
    mastered: Boolean
  }

  type TargetOption {
    id: ID
    name: String
    target: Boolean
  }

  input CreateProgramPayload {
    title: String
    mainProgramId: ID
    clientId: ID
    targets: [TargetInput]
    description: String
    writeAccess: [UserRoles]
    readAccess: [UserRoles]
    type: ProgramTypes
    lastEditedBy: ID
    editedBy: [ID]
    createdBy: ID
    materials: String
    trials: Int
    targetStyle: TargetStyle
    mastered: Boolean
    targetOptions: [TargetOptionInput]
    category: ProgramCategories
    chainingDirection: TrialChainingDirections
    currentChainTarget: ID
    masterTargetPercent: Int
    masterTargetCount: Int
    subscribers: [ID]
    collectionId: ID!
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
    targets: [TargetInput]
    materials: String
    description: String
    writeAccess: [UserRoles]
    readAccess: [UserRoles]
    type: ProgramTypes
    lastEditedBy: ID
    editedBy: [ID]
    createdBy: ID
    targetStyle: TargetStyle
    trials: Int
    mastered: Boolean
    targetOptions: [TargetOptionInput]
    category: ProgramCategories
    chainingDirection: TrialChainingDirections
    currentChainTarget: ID
    masterTargetPercent: Int
    masterTargetCount: Int
    subscribers: [ID]
    collectionId: ID!
  }

  input GetAllProgramsByRelationshipPayload {
    relationshipProperty: String
    id: ID!
  }

  input AddProgramsToClientPayload {
    collectionIds: [ID]
    programIds: [ID]
    clientId: ID
  }

  input TargetInput {
    id: ID
    title: String
    description: String
    required: Boolean
    inputType: InputTypes
    valueType: ProgramValueTypes
    currentMasterCount: Int
    mastered: Boolean
  }

  input TargetOptionInput {
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

  enum ProgramCategories {
    SPEECH_AND_LANGUAGE_SERVICES
    OCCUPATIONAL
    THERAPY
    ABA
    COUNSELING_THERAPEUTIC
    EXECUTIVE_FUNCTIONING
    SKILLS
    MATH
    READING_WRITING
    SELF_REGULATION
    ELL
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

  enum TrialChainingDirections {
    FORWARD
    BACKWARD
  }

  enum TargetStyle {
    DISCRETE_TRIALS
    TASK_ANALYSIS
  }

  type Query {
    getAllPrograms: [Program]
    getProgram(payload: GetProgramPayload): Program
    getAllProgramsByRelationship(
      payload: GetAllProgramsByRelationshipPayload
    ): [Program]
  }

  type Mutation {
    createProgram(payload: CreateProgramPayload): Program
    deleteProgram(payload: DeleteProgramPayload): ID
    updateProgram(payload: UpdateProgramPayload): Program
    addProgramsToClient(payload: AddProgramsToClientPayload): [Program]
  }
`;
