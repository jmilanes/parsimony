import { ObjectId } from "mongodb";

const Message = {
  userId: { type: ObjectId, ref: "User" },
  dataType: String,
  value: String,
  timeStamp: Date
};

const Subscriber = {
  //TODO Change to userId
  id: { type: ObjectId, ref: "User" },
  displayName: String
};

export default {
  subscribers: [Subscriber],
  messages: [Message],
  isTyping: [String],
  name: String
};
