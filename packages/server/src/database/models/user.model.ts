import { ObjectId } from "mongodb";

// TODO: Ask Molly what else needs to be here
const ActionItem = {
  tile: String,
  details: String,
  completed: Boolean,
  ignored: Boolean,
  clientId: { type: ObjectId, ref: "User" }
};

export default {
  schoolId: String,
  timeZone: String,
  roles: [String],
  type: String,
  documents: [String], // TODO: We will have a documents collection these will be ids
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  phone: String,

  // Only for clients
  contacts: [{ type: ObjectId, ref: "User" }],
  actionItems: [{ type: ObjectId, ref: "ActionItem" }],
  programs: [{ type: ObjectId, ref: "User" }],

  // Only of BAs
  clients: [{ type: ObjectId, ref: "User" }] // Only for BAs
};
