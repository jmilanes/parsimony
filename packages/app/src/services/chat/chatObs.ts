import { ChatActionTypes } from "../../enums";
import {
  IAction,
  IThread,
  IThreads,
  ICreatePayload,
  IDeleteThreadPayload,
  ISubscribeUsersToThreadPayload,
  IAddMessagePayload,
  IEditMessagePayload,
  IUpdateIsTypingPayload
} from "@parsimony/types";
import { clone, uuid } from "../../utils";
import { Subject } from "rxjs";
import { socketObservable } from "../..";
import { fetchTreads } from "../../bal";

class ChatServiceObservable {
  threads$: Subject<IThreads>;
  threads: IThreads;
  stateUpdate: () => void;
  constructor() {
    this.threads = {};
    this.threads$ = new Subject<IThreads>();
    this.stateUpdate = () =>
      console.log("State Update Function not registered");
  }

  init = (cb?: () => any) => {
    // this.stateUpdate = cb;
    fetchTreads().then(({ data }) => {
      const formattedData = data.threads.reduce(
        (acc: IThreads, curr: IThread) => {
          acc[curr.id] = curr;
          return acc;
        },
        {}
      );
      this.updateThreads(formattedData);
    });

    socketObservable.subscribe({
      next: (socketMessage: any) => this.updateThread(socketMessage)
    });
  };

  updateThreads = (update: IThreads) => {
    this.threads = update;
    this.threads$.next(this.threads);
  };

  updateThread = (payload: any) => {
    this.updateThreads(this.updateThreadWithPayload(this.threads, payload));
  };

  // updateThreadWithPayload = <payload>(threads: IThreads, action: IAction<payload>) => {
  updateThreadWithPayload = (threads: IThreads, action: any) => {
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
  const updatedState = clone<IThread>(threads);
  updatedState[payload.id] = {
    ...payload,
    isTyping: []
  };
  return updatedState;
};

const deleteThread = (threads: IThreads, payload: IDeleteThreadPayload) => {
  const updatedState = clone<IThread>(threads);
  delete updatedState[payload.id];
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

export default ChatServiceObservable;
