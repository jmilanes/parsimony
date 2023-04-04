import {
  ProgramTypes,
  TargetStyle,
  UserRoles,
  InputTypes,
  ProgramValueTypes,
  ProgramCategories,
  TrialChainingDirections
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
  valueType: { type: String, enum: ProgramValueTypes }
};

export default {
  title: String,
  mainProgramId: ObjectId,
  clientId: ObjectId,
  targets: [Target],
  description: String,
  materials: String,
  writeAccess: [{ type: String, enum: UserRoles }],
  readAccess: [{ type: String, enum: UserRoles }],
  type: { type: String, enum: ProgramTypes },
  lastEditedBy: ObjectId,
  editedBy: [ObjectId],
  createdBy: ObjectId,
  mastered: Boolean,
  trials: Number,
  category: { type: String, enum: ProgramCategories },
  targetOptions: [TargetOption],
  targetStyle: { type: String, enum: TargetStyle },
  chainingDirection: { type: String, enum: TrialChainingDirections }
};
