import { ChatActionTypes } from "@parsimony/types";
import { ICreateResolverParams } from "../index";
import { DataBaseService } from "../../database";
import { modelTypes } from "../../database/models";

export default (ICreateResolverParams: ICreateResolverParams) => ({
  Mutation: {
    createThread: createThread(ICreateResolverParams),
    deleteThread: deleteThread(ICreateResolverParams),
    updateThread: updateThread(ICreateResolverParams),
    addMessage: addMessage(ICreateResolverParams),
    deleteMessage: deleteMessage(ICreateResolverParams),
    editMessage: editMessage(ICreateResolverParams)
  },
  Query: {
    threads: async () =>
      await ICreateResolverParams.db.models[modelTypes.thread].find({}),
    getThreadsByUserId: getThreadsByUserId(ICreateResolverParams)
  }
});

export const createThread =
  ({ db, broadcast }: ICreateResolverParams) =>
  async (_: any, { payload }: { payload: any }) => {
    const thread = await db.createEntry(modelTypes.thread, {
      ...payload,
      messages: []
    });
    broadcast({
      type: ChatActionTypes.CREATE_THREAD,
      payload: { ...payload, id: thread._id }
    });
    return thread;
  };

export const updateThread =
  ({ db, broadcast }: ICreateResolverParams) =>
  async (_: any, { payload }: { payload: any }) => {
    await db.findAndUpdateEntry(modelTypes.thread, { id: payload.id }, payload);
    broadcast({
      type: ChatActionTypes.UPDATE_THREAD,
      payload
    });
    return payload;
  };

export const deleteThread =
  ({ db, broadcast }: ICreateResolverParams) =>
  async (_: any, { payload }: { payload: any }) => {
    await db.deleteEntry(modelTypes.thread, payload.id);
    broadcast({
      type: ChatActionTypes.DELETE_THREAD,
      payload: {
        id: payload.id
      }
    });
    return payload.id;
  };

const _findThread = async (db: DataBaseService, threadId: string) =>
  await db.findEntry(modelTypes.thread, {
    _id: threadId
  });

const getLastItem = (arr: any[]) => arr[arr.length - 1];

export const addMessage =
  ({ db, broadcast }: ICreateResolverParams) =>
  async (_: any, { payload }: { payload: any }) => {
    const thread = await _findThread(db, payload.threadId);
    const message = { ...payload.message, timeStamp: new Date() };
    thread.messages.push(message);
    db.saveEntry(thread);
    const messageId = getLastItem(thread.messages)._id;

    broadcast({
      type: ChatActionTypes.ADD_MESSAGE,
      payload: {
        threadId: thread._id,
        message: {
          id: messageId,
          ...payload.message
        }
      }
    });

    return thread;
  };

export const deleteMessage =
  ({ db, broadcast }: ICreateResolverParams) =>
  async (_: any, { payload }: { payload: any }) => {
    const thread = await _findThread(db, payload.threadId);
    await thread.messages.id(payload.messageId).remove();
    db.saveEntry(thread);
    broadcast({
      type: ChatActionTypes.DELETE_MESSAGE,
      payload
    });

    return payload.messageId;
  };

export const editMessage =
  ({ db, broadcast }: ICreateResolverParams) =>
  async (_: any, { payload }: { payload: any }) => {
    const thread = await _findThread(db, payload.threadId);
    thread.messages.id(payload.messageId).value = payload.value;
    db.saveEntry(thread);
    broadcast({
      type: ChatActionTypes.EDIT_MESSAGE,
      payload: payload
    });
    return payload.messageId;
  };

export const getThreadsByUserId =
  ({ db }: ICreateResolverParams) =>
  async (_: any, { payload }: any) => {
    return await db.findEntries(modelTypes.thread, {
      subscribers: { $elemMatch: { id: payload.id } }
    });
  };
