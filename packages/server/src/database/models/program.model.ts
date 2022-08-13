import { ProgramTypes, RuleStyle, UserRoles } from "@parsimony/types";
import Rule from "./rule.model";
import { ObjectId } from "mongodb";

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
  ruleStyle: { type: String, enum: RuleStyle }
};
