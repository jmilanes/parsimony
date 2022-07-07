import { ChatActionTypes, ICreateResolverParams } from "@parsimony/types";
import { modelTypes } from "../../database/dataBaseController";

export default (ICreateResolverParams: ICreateResolverParams) => ({
  Mutation: {
    createThread: createThread(ICreateResolverParams),
    deleteThread: deleteThread(ICreateResolverParams),
    addMessage: addMessage(ICreateResolverParams)
  },
  Query: {
    threads: async () => await ICreateResolverParams.db.models.Thread.find({})
  }
});

export const createThread =
  ({ db, broadcast }: ICreateResolverParams) =>
  async (_: any, { payload }: { payload: any }) => {
    const thread = await db.createEntry(modelTypes.thread, {
      ...payload
    });

    broadcast({
      type: ChatActionTypes.CREATE_THREAD,
      payload: {
        subscribers: thread.subscribers,
        id: thread._id,
        messages: thread.messages
      }
    });

    return thread;
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

export const addMessage =
  ({ db, broadcast }: ICreateResolverParams) =>
  async (_: any, { payload }: { payload: any }) => {
    const thread = await db.findAndUpdateEntry(modelTypes.thread, {
      id: payload.id
    });

    broadcast({
      type: ChatActionTypes.ADD_MESSAGE,
      payload: {
        subscribers: thread.subscribers,
        threadId: thread._id,
        message: {
          // id?: IId;
          // userId: IId;
          // dataType: "string" | "image";
          // value: string;
          // timeStamp: Date;
        }
      }
    });

    return thread;
  };
