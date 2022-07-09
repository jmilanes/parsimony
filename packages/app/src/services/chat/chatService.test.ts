import {
  IAddMessagePayload,
  ICreateThreadPayload,
  IDeleteThreadPayload,
  IEditMessagePayload,
  ISubscribeUsersToThreadPayload,
  IUpdateIsTypingPayload
} from "@parsimony/types";
import { ChatActionTypes } from "@parsimony/types";
import ChatService from "./chatService";

let idCount = 0;
const mockUUID = "testID";
jest.mock("uuid", () => ({ v4: () => `${mockUUID}_${idCount++}` }));
const getMockId = (count: number) => `${mockUUID}_${count}`;

const addThread = (chat: ChatService, date: Date) => {
  chat.update<ICreateThreadPayload>({
    type: ChatActionTypes.CREATE_THREAD,
    payload: {
      subscribers: ["user1", "user2"]
    }
  });
};

let chat: ChatService;
let date: Date;
beforeEach(() => {
  idCount = 0;
  chat = new ChatService();
  date = new Date();
});
describe("Chat Service Tests", () => {
  test("should start out as an empty array", () => {
    const chat = new ChatService();
    expect(chat.threads).toStrictEqual({});
  });
  test("should create a thread", () => {
    addThread(chat, date);
    expect(Object.keys(chat.threads).length).toBe(1);
    expect(chat.threads).toStrictEqual({
      [getMockId(0)]: {
        id: getMockId(0),
        isTyping: [],
        messages: [],
        subscribers: ["user1", "user2"]
      }
    });
  });
  test("should delete a thread", () => {
    addThread(chat, date);
    chat.update<IDeleteThreadPayload>({
      type: ChatActionTypes.DELETE_THREAD,
      payload: {
        id: getMockId(0)
      }
    });
    expect(Object.keys(chat.threads).length).toBe(0);
    expect(chat.threads).toStrictEqual({});
  });
  test("should subscribe more users to thread", () => {
    addThread(chat, date);
    chat.update<ISubscribeUsersToThreadPayload>({
      type: ChatActionTypes.SUBSCRIBE_USERS_TO_THREAD,
      payload: {
        threadId: getMockId(0),
        subscribers: ["user3", "user4", "user5"]
      }
    });
    expect(chat.threads[getMockId(0)].subscribers).toStrictEqual([
      "user1",
      "user2",
      "user3",
      "user4",
      "user5"
    ]);
  });

  test("should add message to thread", () => {
    addThread(chat, date);
    chat.update<IAddMessagePayload>({
      type: ChatActionTypes.ADD_MESSAGE,
      payload: {
        threadId: getMockId(0),
        message: {
          userId: "user1",
          dataType: "string",
          value: "Hello, what's popping?",
          timeStamp: date
        }
      }
    });
    chat.update<IAddMessagePayload>({
      type: ChatActionTypes.ADD_MESSAGE,
      payload: {
        threadId: getMockId(0),
        message: {
          userId: "user2",
          dataType: "string",
          value: "Hello, what's popping again?",
          timeStamp: date
        }
      }
    });

    expect(chat.threads[getMockId(0)].messages).toStrictEqual([
      {
        id: getMockId(1),
        userId: "user1",
        dataType: "string",
        value: "Hello, what's popping?",
        timeStamp: date
      },
      {
        dataType: "string",
        userId: "user2",
        id: getMockId(2),
        timeStamp: date,
        value: "Hello, what's popping again?"
      }
    ]);
  });

  test("should edit message in thread", () => {
    addThread(chat, date);
    chat.update<IAddMessagePayload>({
      type: ChatActionTypes.ADD_MESSAGE,
      payload: {
        threadId: getMockId(0),
        message: {
          userId: "user1",
          dataType: "string",
          value: "Hello, what's popping?",
          timeStamp: date
        }
      }
    });
    chat.update<IEditMessagePayload>({
      type: ChatActionTypes.EDIT_MESSAGE,
      payload: {
        threadId: getMockId(0),
        messageId: getMockId(1),
        value: "No, wait let's not!"
      }
    });
    expect(chat.threads[getMockId(0)].messages[0]).toStrictEqual({
      dataType: "string",
      userId: "user1",
      id: getMockId(1),
      timeStamp: date,
      value: "No, wait let's not!"
    });
  });

  test("should add/remove user to typing", () => {
    addThread(chat, date);
    chat.update<IUpdateIsTypingPayload>({
      type: ChatActionTypes.UPDATE_IS_TYPING,
      payload: {
        threadId: getMockId(0),
        user: "user1",
        value: true
      }
    });
    chat.update<IUpdateIsTypingPayload>({
      type: ChatActionTypes.UPDATE_IS_TYPING,
      payload: {
        threadId: getMockId(0),
        user: "user2",
        value: true
      }
    });
    // Makes sure we are not returning duplicates
    chat.update<IUpdateIsTypingPayload>({
      type: ChatActionTypes.UPDATE_IS_TYPING,
      payload: {
        threadId: getMockId(0),
        user: "user2",
        value: true
      }
    });
    expect(chat.threads[getMockId(0)].isTyping).toStrictEqual([
      "user1",
      "user2"
    ]);
    chat.update<IUpdateIsTypingPayload>({
      type: ChatActionTypes.UPDATE_IS_TYPING,
      payload: {
        threadId: getMockId(0),
        user: "user1",
        value: false
      }
    });
    chat.update<IUpdateIsTypingPayload>({
      type: ChatActionTypes.UPDATE_IS_TYPING,
      payload: {
        threadId: getMockId(0),
        user: "user2",
        value: false
      }
    });

    expect(chat.threads[getMockId(0)].isTyping).toStrictEqual([]);
  });
});
