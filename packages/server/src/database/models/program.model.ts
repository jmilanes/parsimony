import {
  ProgramTypes,
  RuleStyle,
  UserRoles,
  InputTypes,
  ProgramValueTypes
} from "@parsimony/types";

import { ObjectId } from "mongodb";

const RuleOption = {
  name: String,
  target: Boolean
};

const Rule = {
  question: String,
  description: String,
  steps: Number,
  options: [RuleOption],
  required: Boolean,
  inputType: { type: String, enum: InputTypes },
  valueType: { type: String, enum: ProgramValueTypes }
};

export default {
  title: String,
  mainProgramId: ObjectId,
  clientId: ObjectId,
  rules: [Rule],
  description: String,
  writeAccess: [{ type: String, enum: UserRoles }],
  readAccess: [{ type: String, enum: UserRoles }],
  type: { type: String, enum: ProgramTypes },
  lastEditedBy: ObjectId,
  editedBy: [ObjectId],
  createdBy: ObjectId,
  mastered: Boolean,
  ruleStyle: { type: String, enum: RuleStyle }
};
