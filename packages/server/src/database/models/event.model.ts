import { ObjectId } from "mongodb";

export default {
  title: String,
  agenda: String,
  timeZone: String,
  startTime: Date,
  endTime: Date,
  repeat: Boolean,
  repeatFrequency: String, // TODO: Create enum / frequency options
  program: [{ type: ObjectId, ref: "Program" }],
  documents: [{ type: ObjectId, ref: "Documents" }],
  users: [{ type: ObjectId, ref: "User" }]
};
