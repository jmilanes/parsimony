import {
  IThread,
  IThreads,
  ICreateThreadPayload,
  IDeleteThreadPayload,
  IAddMessagePayload,
  IEditMessagePayload,
  IUpdateIsTypingPayload,
  IUpdateThreadPayload,
  IDeleteMessagePayload,
  IId,
  ChatActionTypes
} from "@parsimony/types";
import { clone } from "../../utils";
import { Subject } from "rxjs";
import { socketObservable } from "../..";
import { fetchTreads } from "../../bal";

export default class ChatServiceObservable {
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
    //TODO Need to make a universal space for state managment
    this.threads$.next(this.threads);
  };

  updateThread = (payload: any) => {
    this.updateThreads(this.updateThreadWithPayload(this.threads, payload));
  };

  updateThreadWithPayload = (threads: IThreads, action: any) => {
    const freshThreads = action.type && clone<IThread>(threads);
    switch (action.type) {
      case ChatActionTypes.CREATE_THREAD:
        return createThread(
          freshThreads,
          action.payload as unknown as ICreateThreadPayload & { id: string }
        );
      case ChatActionTypes.DELETE_THREAD:
        return deleteThread(
          freshThreads,
          action.payload as unknown as IDeleteThreadPayload
        );
      case ChatActionTypes.UPDATE_THREAD:
        return updateThread(
          freshThreads,
          action.payload as unknown as IUpdateThreadPayload
        );
      case ChatActionTypes.ADD_MESSAGE:
        return addMessage(
          freshThreads,
          action.payload as unknown as IAddMessagePayload
        );
      case ChatActionTypes.DELETE_MESSAGE:
        return deleteMessage(
          freshThreads,
          action.payload as unknown as IDeleteMessagePayload
        );
      case ChatActionTypes.EDIT_MESSAGE:
        return editMessage(
          freshThreads,
          action.payload as unknown as IEditMessagePayload
        );
      case ChatActionTypes.UPDATE_IS_TYPING:
        return updateIsTyping(
          freshThreads,
          action.payload as unknown as IUpdateIsTypingPayload
        );
      default:
        return threads;
    }
  };
}

const createThread = (
  threads: IThreads,
  payload: ICreateThreadPayload & { id: string }
) => {
  threads[payload.id] = {
    ...payload,
    isTyping: [],
    messages: []
  };
  return threads;
};

const deleteThread = (threads: IThreads, payload: IDeleteThreadPayload) => {
  delete threads[payload.id];
  return threads;
};

const updateThread = (threads: IThreads, payload: IUpdateThreadPayload) => {
  threads[payload.id] = { ...threads[payload.id], ...payload };
  return threads;
};

const addMessage = (threads: IThreads, payload: IAddMessagePayload) => {
  const thread = threads[payload.threadId];
  thread.messages = [...thread.messages, payload.message];
  return threads;
};

const deleteMessage = (threads: IThreads, payload: IDeleteMessagePayload) => {
  const thread = threads[payload.threadId];
  thread.messages = thread.messages.filter(
    (msg) => msg.id !== payload.messageId
  );
  return threads;
};

const editMessage = (threads: IThreads, payload: IEditMessagePayload) => {
  const thread = threads[payload.threadId];
  thread.messages = thread.messages.map((message) => {
    if (message.id === payload.messageId) {
      return { ...message, value: payload.value };
    }
    return message;
  });
  return threads;
};

const updateIsTyping = (threads: IThreads, payload: IUpdateIsTypingPayload) => {
  const thread = threads[payload.threadId];
  if (payload.value && thread.isTyping.includes(payload.user)) return threads;
  if (payload.value) {
    thread.isTyping = [...thread.isTyping, payload.user];
  } else {
    thread.isTyping = threads[payload.threadId].isTyping.filter(
      (user) => user !== payload.user
    );
  }
  return threads;
};
