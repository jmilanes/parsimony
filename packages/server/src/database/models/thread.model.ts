import { ObjectId } from "mongodb";

const Message = {
  userId: { type: ObjectId, ref: "User" },
  dataType: String,
  value: String,
  timeStamp: Date
};

export default {
  subscribers: [{ type: ObjectId, ref: "User" }],
  messages: [Message],
  isTyping: [String],
  name: String
};
