import {
  InputTypes,
  ProgramCategories,
  ProgramTypes,
  ProgramValueTypes,
  ProgramViewTypes,
  TrialChainingDirections,
  UserRoles,
  BehaviorType
} from "@parsimony/types";

import { ObjectId } from "mongodb";

const TargetOption = {
  name: String,
  target: Boolean
};

const Target = {
  title: String,
  description: String,
  required: Boolean,
  inputType: { type: String, enum: InputTypes },
  valueType: { type: String, enum: ProgramValueTypes },
  currentMasterCount: Number,
  mastered: Boolean
};

const Behavior = {
  type: { type: String, enum: BehaviorType },
  alertTime: Number,
  active: Boolean,
  operationalDefinition: String,
  precursorBehaviors: String,
  proactiveStrategies: String,
  reactiveStrategies: String
};

const Chaining = {
  type: { type: String, enum: TrialChainingDirections },
  targetCompleteness: Number
};

export default {
  active: Boolean,
  title: String,
  mainProgramId: ObjectId,
  clientId: { type: ObjectId, ref: "User" },
  targets: [Target],
  description: String,
  materials: String,
  // TODO Do we need these anymore?
  writeAccess: [{ type: String, enum: UserRoles }],
  readAccess: [{ type: String, enum: UserRoles }],
  type: { type: String, enum: ProgramTypes },
  lastEditedBy: { type: ObjectId, ref: "User" },
  editedBy: [{ type: ObjectId, ref: "User" }],
  createdBy: { type: ObjectId, ref: "User" },
  mastered: Boolean,
  trials: Number,
  category: {
    type: String,
    enum: ProgramCategories
  },
  targetOptions: [TargetOption],
  targetStyle: { type: String, enum: ProgramViewTypes },
  masteryTarget: Number,
  masteryConsecutiveTargets: Number,
  subscribers: [{ type: ObjectId, ref: "User" }],
  collectionId: { type: ObjectId, ref: "Collection" },
  behavior: Behavior,
  chaining: Chaining
};

// export enum PROGRAM_VIEW_TYPES {
//   DiscreteTrials = "DISCRETE_TRIALS",
//   TaskAnalysisBackward = "TASK_ANALYSIS_BACKWARD",
//   TaskAnalysisForward = "TASK_ANALYSIS_FORWARD",
//   TaskAnalysisTotal = "TASK_ANALYSIS_TOTAL",
//   BehaviorDuration = "BEHAVIOR_DURATION",
//   BehaviorFrequency = "BEHAVIOR_FREQUENCY",
//   BehaviorInterval = "BEHAVIOR_INTERVAL"
// }
