import { BaseCrudResolvers } from "../baseCrudResolver";
import { BroadcastService, modelTypes } from "../../index";
import { ChatActionTypes } from "@parsimony/types";
import { Service } from "typedi";
import { AppDB } from "../../app.database";

@Service()
export class ThreadResolver extends BaseCrudResolvers {
  #bs: BroadcastService;
  #db: AppDB;

  constructor(db: AppDB, bs: BroadcastService) {
    super(db, bs);
    this.model = modelTypes.thread;
    this.shouldBroadcast = true;
    this.#db = db;
    this.#bs = bs;
    this.initTreadMutations();
  }

  initTreadMutations() {
    this.setMutation("addMessage", this.addMessage);
    this.setMutation("deleteMessage", this.deleteMessage);
    this.setMutation("editMessage", this.editMessage);
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
