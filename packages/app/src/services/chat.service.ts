import {
  AddMessagePayload,
  ChatActionTypes,
  Domains,
  CreateThreadPayload,
  DeleteMessagePayload,
  DeleteThreadPayload,
  EditMessagePayload,
  IId,
  IUpdateIsTypingPayload,
  Message,
  Thread,
  UpdateThreadPayload
} from "@parsimony/types";
import { clone } from "../utils";
import { BehaviorSubject } from "rxjs";
import { getAllThreadsByRelationship } from "@parsimony/bal";
import Store from "./store";
import { Service } from "typedi";
import { SocketService } from "../domains/requests/socketService/socket.service";

export type ThreadDomain = Record<string, Thread>;

@Service()
export default class ChatService {
  threads$: BehaviorSubject<ThreadDomain>;
  #socketService: SocketService;
  #store: Store;

  constructor(s: Store, ss: SocketService) {
    this.#store = s;
    this.#socketService = ss;
    this.threads$ = this.#store.getDomain$(Domains.Thread);
  }

  init = async () => {
    // TODO: Create better way to get current user data (auth shouldn't need to be reliant on client side user data and there should be a service to access the auth data)
    const id = localStorage.getItem("currentUserId");
    if (!id) return;

    // TODO: DO not directly use the BAL (change when you make an command api)
    const threads = await getAllThreadsByRelationship({
      relationshipProperty: "subscribers",
      id: id
    });

    const formattedData = threads.reduce((acc: ThreadDomain, curr: Thread) => {
      acc[curr.id] = curr;
      return acc;
    }, {});

    this.updateThreads(formattedData);

    this.#socketService.subscribeToSocket((socketMessage: any) =>
      this.updateThread(socketMessage)
    );
  };

  subscribe = (next: any) => {
    this.threads$.subscribe(next);
  };

  updateThreads = (threads: ThreadDomain) => {
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

  updateThreadWithPayload = (threads: ThreadDomain, action: any) => {
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
      case ChatActionTypes.CREATE_MESSAGE:
        return addMessage(
          freshThreads,
          action.payload as unknown as AddMessagePayload
        );
      case ChatActionTypes.DELETE_MESSAGE:
        return deleteMessage(
          freshThreads,
          action.payload as unknown as DeleteMessagePayload
        );
      case ChatActionTypes.UPDATE_MESSAGE:
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
  threads: ThreadDomain,
  payload: CreateThreadPayload & { id: IId }
) => {
  threads[payload.id] = {
    ...payload,
    isTyping: [],
    messages: []
  };
  return threads;
};

const deleteThread = (threads: ThreadDomain, payload: DeleteThreadPayload) => {
  delete threads[payload.id];
  return threads;
};

const updateThread = (threads: ThreadDomain, payload: UpdateThreadPayload) => {
  threads[payload.id] = { ...threads[payload.id], ...payload };
  return threads;
};

const addMessage = (threads: ThreadDomain, payload: AddMessagePayload) => {
  const thread = threads[payload.threadId];
  const currMessages = thread?.messages || [];
  thread.messages = [...currMessages, payload?.message as Message];
  return threads;
};

const deleteMessage = (
  threads: ThreadDomain,
  payload: DeleteMessagePayload
) => {
  const thread = threads[payload.threadId];
  thread.messages = thread.messages?.filter(
    (msg) => msg?.id !== payload.messageId
  );
  return threads;
};

const editMessage = (threads: ThreadDomain, payload: EditMessagePayload) => {
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
  threads: ThreadDomain,
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
