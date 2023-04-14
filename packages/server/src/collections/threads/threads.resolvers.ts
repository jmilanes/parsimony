import { BaseCrudResolvers } from "../baseCrudResolver";
import { BroadcastService, DataBaseService, modelTypes } from "../../database";
import { ChatActionTypes } from "@parsimony/types";
import { Service } from "typedi";

@Service()
export class ThreadResolver extends BaseCrudResolvers {
  #bs: BroadcastService;
  #db: DataBaseService;

  constructor(db: DataBaseService, bs: BroadcastService) {
    super(db, bs);
    this.model = modelTypes.thread;
    this.shouldBroadcast = true;
    this.#db = db;
    this.#bs = bs;
  }

  // TODO make this better
  getMutations() {
    return {
      [this.propWithModel("create")]: this.create,
      [this.propWithModel("delete")]: this.delete,
      [this.propWithModel("update")]: this.update,
      addMessage: this.addMessage,
      deleteMessage: this.deleteMessage,
      editMessage: this.editMessage
    };
  }

  addMessage = async (_: any, { payload }: { payload: any }) => {
    const thread = await this._findThread(payload.threadId);
    const message = { ...payload.message, timeStamp: new Date() };
    thread.messages.push(message);
    await this.#db.saveEntry(thread);
    const messageId = this._getLastItem(thread.messages)._id;

    this.#bs.broadcast({
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

  deleteMessage = async (_: any, { payload }: { payload: any }) => {
    const thread = await this._findThread(payload.threadId);
    await thread.messages.id(payload.messageId).remove();
    await this.#db.saveEntry(thread);
    this.#bs.broadcast({
      type: ChatActionTypes.DELETE_MESSAGE,
      payload
    });

    return payload.messageId;
  };

  editMessage = async (_: any, { payload }: { payload: any }) => {
    const thread = await this._findThread(payload.threadId);
    thread.messages.id(payload.messageId).value = payload.value;
    await this.#db.saveEntry(thread);
    this.#bs.broadcast({
      type: ChatActionTypes.UPDATE_MESSAGE,
      payload: payload
    });
    return payload.messageId;
  };

  private _findThread = async (threadId: string) =>
    await this.#db.findEntry(modelTypes.thread, {
      _id: threadId
    });

  private _getLastItem = (arr: any[]) => arr[arr.length - 1];
}
