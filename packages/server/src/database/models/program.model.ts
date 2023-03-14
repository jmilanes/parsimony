import {
  ProgramTypes,
  TargetStyle,
  UserRoles,
  InputTypes,
  ProgramValueTypes
} from "@parsimony/types";

import { ObjectId } from "mongodb";

const TargetOption = {
  name: String,
  target: Boolean
};

const Target = {
  title: String,
  description: String,
  options: [TargetOption],
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
  targetStyle: { type: String, enum: TargetStyle }
};
