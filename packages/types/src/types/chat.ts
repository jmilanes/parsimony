import { ChatActionTypes } from "../enums";
export type IId = string;
export type IThread = {
  id: IId;
  subscribers: IId[];
  messages: IMessage[];
  isTyping: IId[];
};

export type IMessage = {
  id?: IId;
  userId: IId;
  dataType: "string" | "image";
  value: string;
  timeStamp: Date;
};

export type IAction<payload> = {
  type: ChatActionTypes;
  payload: payload;
};

export type ICreatePayload = {
  subscribers: string[];
  message: IMessage;
};

export type IDeleteThreadPayload = {
  threadId: IId;
};

export type ISubscribeUsersToThreadPayload = {
  threadId: IId;
  subscribers: IId[];
};

export type IAddMessagePayload = {
  threadId: IId;
  message: IMessage;
};

export type IEditMessagePayload = {
  messageId: IId;
  threadId: IId;
  value: string;
};

export type IUpdateIsTypingPayload = {
  threadId: IId;
  user: string;
  value: boolean;
};

export type IThreads = Record<IId, IThread>;
