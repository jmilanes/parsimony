import { ObjectId } from "mongodb";

export default {
  timeZone: String,
  roles: [String],
  type: String,
  documents: [String], // TODO: We will have a documents domain these will be ids
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  phone: String,
  // Only for clients
  contacts: [{ type: ObjectId, ref: "User" }],
  actionItems: [{ type: ObjectId, ref: "ActionItem" }],
  programs: [{ type: ObjectId, ref: "Program" }],
  // Only of BAs
  clients: [{ type: ObjectId, ref: "User" }], // Only for BAs
  threadDisplayNameName: String,
  avatar: String,
  color: String,
  serviceProvider: String,
  schoolId: String
};
