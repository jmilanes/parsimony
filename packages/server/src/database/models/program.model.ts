import {
  InputTypes,
  ProgramCategories,
  ProgramTypes,
  ProgramValueTypes,
  TargetStyle,
  TrialChainingDirections,
  UserRoles
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

export default {
  title: String,
  mainProgramId: ObjectId,
  clientId: { type: ObjectId, ref: "User" },
  targets: [Target],
  description: String,
  materials: String,
  writeAccess: [{ type: String, enum: UserRoles }],
  readAccess: [{ type: String, enum: UserRoles }],
  type: { type: String, enum: ProgramTypes },
  lastEditedBy: { type: ObjectId, ref: "User" },
  editedBy: [{ type: ObjectId, ref: "User" }],
  createdBy: { type: ObjectId, ref: "User" },
  mastered: Boolean,
  trials: Number,
  category: { type: String, enum: ProgramCategories },
  targetOptions: [TargetOption],
  targetStyle: { type: String, enum: TargetStyle },
  chainingDirection: { type: String, enum: TrialChainingDirections },
  currentChainTarget: { type: ObjectId, ref: "Target" },
  masterTargetPercent: Number,
  masterTargetCount: Number,
  subscribers: [{ type: ObjectId, ref: "User" }]
};
