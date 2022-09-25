import { ObjectId } from "mongodb";

//TODO: I need more details on how this experience is going to work!
export default {
  title: String,
  clientId: { type: ObjectId, ref: "User" },
  document: String, // TODO: Make this actually a file
  uploadedBy: { type: ObjectId, ref: "User" }
};
