import { CrudResolvers } from "../createCrudResolver";
import { DataBaseService, modelTypes } from "../../database";
import { ICreateResolverParams } from "../index";
import { ChatActionTypes } from "@parsimony/types";

class ThreadResolver extends CrudResolvers {
  // DI and make this better
  getMutations(CreateResolverParams: ICreateResolverParams) {
    return {
      [this.propWithModel("create")]: this.create(CreateResolverParams),
      [this.propWithModel("delete")]: this.delete(CreateResolverParams),
      [this.propWithModel("update")]: this.update(CreateResolverParams),
      addMessage: this.addMessage(CreateResolverParams),
      deleteMessage: this.deleteMessage(CreateResolverParams),
      editMessage: this.editMessage(CreateResolverParams)
    };
  }

  addMessage =
    ({ db, broadcast }: ICreateResolverParams) =>
    async (_: any, { payload }: { payload: any }) => {
      const thread = await this._findThread(db, payload.threadId);
      const message = { ...payload.message, timeStamp: new Date() };
      thread.messages.push(message);
      await db.saveEntry(thread);
      const messageId = this._getLastItem(thread.messages)._id;

      broadcast({
        type: ChatActionTypes.CREATE_MESSAGE,
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

  deleteMessage =
    ({ db, broadcast }: ICreateResolverParams) =>
    async (_: any, { payload }: { payload: any }) => {
      const thread = await this._findThread(db, payload.threadId);
      await thread.messages.id(payload.messageId).remove();
      await db.saveEntry(thread);
      broadcast({
        type: ChatActionTypes.DELETE_MESSAGE,
        payload
      });

      return payload.messageId;
    };

  editMessage =
    ({ db, broadcast }: ICreateResolverParams) =>
    async (_: any, { payload }: { payload: any }) => {
      const thread = await this._findThread(db, payload.threadId);
      thread.messages.id(payload.messageId).value = payload.value;
      await db.saveEntry(thread);
      broadcast({
        type: ChatActionTypes.UPDATE_MESSAGE,
        payload: payload
      });
      return payload.messageId;
    };

  private _findThread = async (db: DataBaseService, threadId: string) =>
    await db.findEntry(modelTypes.thread, {
      _id: threadId
    });

  private _getLastItem = (arr: any[]) => arr[arr.length - 1];
}

export default new ThreadResolver(modelTypes.thread, true);
