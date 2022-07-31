import { ObjectId } from "mongodb";

export default {
  schoolId: String,
  timeZone: String,
  roles: [String],
  type: String,
  documents: [String], // We will have a documents collection these will be ids
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  phone: String,
  contacts: [{ type: ObjectId, ref: "User" }] // TODO Add Program Association Here
};
