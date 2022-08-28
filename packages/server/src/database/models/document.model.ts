import { ObjectId } from "mongodb";

//TODO: I need more details on how this experience is going to work!
export default {
  title: String,
  clientId: { type: ObjectId, ref: "User" },
  details: String,
  signature: String,
  completed: Boolean
};
