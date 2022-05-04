import { IId } from "../../types";
import { clone, uuid } from "../../utils";

// One thing we could do is have threads be there own reducers and there would be less cloning and the events would be much clearer
// Cloning the state with all of the messages will get very expensive eventually for every thread which is what you are doing
export enum ChatActionTypes {
  CREATE_THREAD = "CREATE_THREAD",
  DELETE_THREAD = "DELETE_THREAD",
  SUBSCRIBE_USERS_TO_THREAD = "SUBSCRIBE_USERS_TO_THREAD",
  ADD_MESSAGE = "ADD_MESSAGE",
  EDIT_MESSAGE = "EDIT_MESSAGE",
  UPDATE_IS_TYPING = "UPDATE_IS_TYPING"
}

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

class ChatService {
  threads: IThreads;
  constructor() {
    this.threads = {};
  }

  // registerThreadSubscribers = (id: IId) =>
  //   this.threads[id]?.notifySubscribers();
  // notifyThreadSubscribers = (id: IId) => this.threads[id]?.notifySubscribers();

  update = <payload>(action: IAction<payload>) => {
    this.threads = this.updateThread<payload>(this.threads, action);
  };

  updateThread = <payload>(threads: IThreads, action: IAction<payload>) => {
    switch (action.type) {
      case ChatActionTypes.CREATE_THREAD:
        return createThread(
          threads,
          action.payload as unknown as ICreatePayload
        );
      case ChatActionTypes.DELETE_THREAD:
        return deleteThread(
          threads,
          action.payload as unknown as IDeleteThreadPayload
        );
      case ChatActionTypes.SUBSCRIBE_USERS_TO_THREAD:
        return subscribersUsersToThread(
          threads,
          action.payload as unknown as ISubscribeUsersToThreadPayload
        );
      case ChatActionTypes.ADD_MESSAGE:
        return addMessage(
          threads,
          action.payload as unknown as IAddMessagePayload
        );
      case ChatActionTypes.EDIT_MESSAGE:
        return editMessage(
          threads,
          action.payload as unknown as IEditMessagePayload
        );
      case ChatActionTypes.UPDATE_IS_TYPING:
        return updateIsTyping(
          threads,
          action.payload as unknown as IUpdateIsTypingPayload
        );
      default:
        return threads;
    }
  };
}

const createThread = (threads: IThreads, payload: ICreatePayload) => {
  const id = uuid();
  const updatedState = clone<IThread>(threads);
  payload.message.id = uuid();
  updatedState[id] = {
    id,
    subscribers: payload.subscribers,
    messages: [payload.message],
    isTyping: []
  };
  return updatedState;
};

const deleteThread = (threads: IThreads, payload: IDeleteThreadPayload) => {
  const updatedState = clone<IThread>(threads);
  delete updatedState[payload.threadId];
  return updatedState;
};

const subscribersUsersToThread = (
  threads: IThreads,
  payload: ISubscribeUsersToThreadPayload
) => {
  const updatedState = clone<IThread>(threads);
  updatedState[payload.threadId].subscribers = [
    ...updatedState[payload.threadId].subscribers,
    ...payload.subscribers
  ];
  return updatedState;
};

const addMessage = (threads: IThreads, payload: IAddMessagePayload) => {
  const updatedState = clone<IThread>(threads);
  payload.message.id = uuid();
  updatedState[payload.threadId].messages = [
    ...updatedState[payload.threadId].messages,
    payload.message
  ];
  return updatedState;
};

const editMessage = (threads: IThreads, payload: IEditMessagePayload) => {
  const updatedState = clone<IThread>(threads);
  updatedState[payload.threadId].messages = updatedState[
    payload.threadId
  ].messages.map((message) => {
    if (message.id === payload.messageId) {
      message.value = payload.value;
      return message;
    }
    return message;
  });
  return updatedState;
};

const updateIsTyping = (threads: IThreads, payload: IUpdateIsTypingPayload) => {
  const updatedState = clone<IThread>(threads);
  if (
    payload.value &&
    updatedState[payload.threadId].isTyping.includes(payload.user)
  )
    return updatedState;
  if (payload.value) {
    updatedState[payload.threadId].isTyping = [
      ...updatedState[payload.threadId].isTyping,
      payload.user
    ];
  } else {
    updatedState[payload.threadId].isTyping = updatedState[
      payload.threadId
    ].isTyping.filter((user) => user !== payload.user);
  }

  return updatedState;
};

export default ChatService;
