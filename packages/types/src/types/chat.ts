import { ChatActionTypes } from "@parsimony/types";
import { IId } from "./";

export type IThread = {
  id: IId;
  name?: string;
  subscribers: IId[];
  messages: IMessage[];
  isTyping: IId[];
};

export type IMessage = {
  id?: IId;
  userId: IId;
  dataType: "string" | "image";
  value: string;
  timeStamp?: Date;
};

export type IAction<payload> = {
  type: ChatActionTypes;
  payload: payload;
};

export type ICreateThreadPayload = {
  name?: string;
  subscribers: string[];
};

export type IDeleteThreadPayload = {
  id: IId;
};

export type IUpdateThreadPayload = {
  id: IId;
  subscribers: IId[];
  name: string;
};

export type IAddMessagePayload = {
  threadId: IId;
  message: IMessage;
};

export type IDeleteMessagePayload = {
  threadId: IId;
  messageId: IId;
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
