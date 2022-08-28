const Message = {
  dataType: String,
  value: String,
  timeStamp: Date
};

export default {
  subscribers: [String],
  messages: [Message],
  isTyping: [String],
  name: String
};
