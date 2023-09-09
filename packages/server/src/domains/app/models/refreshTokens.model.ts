import { ObjectId } from "mongodb";

export default {
  token: String,
  userId: { type: ObjectId, ref: "User" }
};
