import { ObjectId } from "mongodb";

export default {
  dateCreated: Date,
  dateEdited: Date,
  schoolId: String,
  timeZone: String,
  roles: [String],
  type: String,
  documents: [String], // These will be uploaded PDFs or maybe jpegs associated with client or like a dynamic doc
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  phone: String,
  contacts: [{ type: ObjectId, ref: "User" }] // TODO Add Program Association Here
};
