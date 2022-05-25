import Message from "./message";

export default {
  subscribers: [String],
  messages: [Message],
  isTyping: [String],
  name: String
};

// export type IThread = {
//   subscribers: IId[];
//   messages: IMessage[];
//   isTyping: IId[];
// };
