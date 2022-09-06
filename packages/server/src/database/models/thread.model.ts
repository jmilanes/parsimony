import { ObjectId } from "mongodb";

const Message = {
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
