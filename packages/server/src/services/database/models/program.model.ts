import { Schema } from "mongoose";
import { ObjectId } from "mongodb";

export default new Schema(
  {
    // put core things here
    clientId: { type: ObjectId, enum: "User" }
  },
  { strict: false }
);
