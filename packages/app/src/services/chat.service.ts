import {
  IUpdateIsTypingPayload,
  ChatActionTypes,
  Thread,
  CreateThreadPayload,
  IId,
  DeleteThreadPayload,
  UpdateThreadPayload,
  DeleteMessagePayload,
  AddMessagePayload,
  EditMessagePayload,
  Message,
  Collections
} from "@parsimony/types";
import { clone } from "../utils";
import { BehaviorSubject } from "rxjs";
import { getThreadsByUserId } from "../bal";
import { ISocket$ } from "./app.service";
import Store from "./store";

export type ThreadCollection = Record<string, Thread>;

// This service could be abstract SocketStreamingGenerator
export default class ChatService {
  threads$: BehaviorSubject<ThreadCollection>;
  socket$: ISocket$;
  constructor(socket$: ISocket$, store: Store) {
    this.threads$ = store.getCollection$(Collections.Thread);
    this.socket$ = socket$;
  }

  init = () => {
    // TODO: Create better way to get current user data (auth shouldn't need to be reliant on client side user data and there should be a service to access the auth data)
    getThreadsByUserId({
      id: localStorage.getItem("currentUserId") || ""
    }).then((threads) => {
      const formattedData = threads.reduce(
        (acc: ThreadCollection, curr: Thread) => {
          acc[curr.id] = curr;
          return acc;
        },
        {}
      );
      this.updateThreads(formattedData);
    });

    this.socket$.subscribe({
      next: (socketMessage: any) => this.updateThread(socketMessage)
    });
  };

  subscribe = (next: any) => {
    this.threads$.subscribe(next);
  };

  updateThreads = (threads: ThreadCollection) => {
    //TODO Need to make a universal space for state management
    this.threads$.next(threads);
  };

  updateThread = (payload: any) => {
    const updatedThreads = this.updateThreadWithPayload(
      this.threads$.value,
      payload
    );
    this.updateThreads(updatedThreads);
  };

  updateThreadWithPayload = (threads: ThreadCollection, action: any) => {
    const freshThreads = action.type && clone<Thread>(threads);
    switch (action.type) {
      case ChatActionTypes.CREATE_THREAD:
        return createThread(
          freshThreads,
          action.payload as unknown as CreateThreadPayload & { id: IId }
        );
      case ChatActionTypes.DELETE_THREAD:
        return deleteThread(
          freshThreads,
          action.payload as unknown as DeleteThreadPayload
        );
      case ChatActionTypes.UPDATE_THREAD:
        return updateThread(
          freshThreads,
          action.payload as unknown as UpdateThreadPayload
        );
      case ChatActionTypes.ADD_MESSAGE:
        return addMessage(
          freshThreads,
          action.payload as unknown as AddMessagePayload
        );
      case ChatActionTypes.DELETE_MESSAGE:
        return deleteMessage(
          freshThreads,
          action.payload as unknown as DeleteMessagePayload
        );
      case ChatActionTypes.EDIT_MESSAGE:
        return editMessage(
          freshThreads,
          action.payload as unknown as EditMessagePayload
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
  threads: ThreadCollection,
  payload: CreateThreadPayload & { id: IId }
) => {
  threads[payload.id] = {
    ...payload,
    isTyping: [],
    messages: []
  };
  return threads;
};

const deleteThread = (
  threads: ThreadCollection,
  payload: DeleteThreadPayload
) => {
  delete threads[payload.id];
  return threads;
};

const updateThread = (
  threads: ThreadCollection,
  payload: UpdateThreadPayload
) => {
  threads[payload.id] = { ...threads[payload.id], ...payload };
  return threads;
};

const addMessage = (threads: ThreadCollection, payload: AddMessagePayload) => {
  const thread = threads[payload.threadId];
  const currMessages = thread?.messages || [];
  thread.messages = [...currMessages, payload?.message as Message];
  return threads;
};

const deleteMessage = (
  threads: ThreadCollection,
  payload: DeleteMessagePayload
) => {
  const thread = threads[payload.threadId];
  thread.messages = thread.messages?.filter(
    (msg) => msg?.id !== payload.messageId
  );
  return threads;
};

const editMessage = (
  threads: ThreadCollection,
  payload: EditMessagePayload
) => {
  const thread = threads[payload.threadId];
  thread.messages = thread.messages?.map((message) => {
    if (message?.id === payload.messageId) {
      return { ...message, value: payload.value };
    }
    return message;
  });
  return threads;
};

const updateIsTyping = (
  threads: ThreadCollection,
  payload: IUpdateIsTypingPayload
) => {
  const thread = threads[payload.threadId];
  const isTyping = thread?.isTyping || [];
  if (payload.value && isTyping.includes(payload.user)) return threads;
  if (payload.value) {
    thread.isTyping = [...isTyping, payload.user];
  } else {
    thread.isTyping = isTyping?.filter((user) => user !== payload.user);
  }
  return threads;
};
