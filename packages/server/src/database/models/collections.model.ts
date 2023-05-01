import { ObjectId } from "mongodb";

export default {
  title: String,
  ancestors: [{ type: ObjectId, ref: "Collection" }],
  collections: [{ type: ObjectId, ref: "Collection" }],
  programs: [{ type: ObjectId, ref: "Program" }],
  created_by: { type: ObjectId, ref: "User" }
};
