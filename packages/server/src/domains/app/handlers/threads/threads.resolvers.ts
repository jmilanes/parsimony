import { AuthContext, BaseCrudResolvers } from "../baseCrudResolver";
import { BroadcastService, modelTypes } from "../../../database";
import { ChatActionTypes } from "@parsimony/types";
import { Service } from "typedi";
import { AppDataGateway } from "../../app.data.gateway";

@Service()
export class ThreadResolver extends BaseCrudResolvers {
  #bs: BroadcastService;
  #adg: AppDataGateway;

  constructor(adg: AppDataGateway, bs: BroadcastService) {
    super(adg, bs);
    this.model = modelTypes.thread;
    this.shouldBroadcast = true;
    this.#adg = adg;
    this.#bs = bs;
    this.initTreadMutations();
  }

  initTreadMutations() {
    this.setMutation("addMessage", this.addMessage);
    this.setMutation("deleteMessage", this.deleteMessage);
    this.setMutation("editMessage", this.editMessage);
  }

  addMessage = async (
    _: any,
    { payload }: { payload: any },
    { currentUser }: AuthContext
  ) => {
    const thread = await this._findThread(payload.threadId, _);
    const message = { ...payload.message, timeStamp: new Date() };
    thread.messages.push(message);
    await this.#adg.dbBySchoolId(currentUser.schoolId).saveEntry(thread);
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

  deleteMessage = async (
    _: any,
    { payload }: { payload: any },
    { currentUser }: AuthContext
  ) => {
    const thread = await this._findThread(payload.threadId, _);
    await thread.messages.id(payload.messageId).remove();
    await this.#adg.dbBySchoolId(currentUser.schoolId).saveEntry(thread);
    this.#bs.broadcast({
      type: ChatActionTypes.DELETE_MESSAGE,
      payload
    });

    return payload.messageId;
  };

  editMessage = async (
    _: any,
    { payload }: { payload: any },
    { currentUser }: AuthContext
  ) => {
    const thread = await this._findThread(payload.threadId, currentUser);
    thread.messages.id(payload.messageId).value = payload.value;
    await this.#adg.dbBySchoolId(currentUser.schoolId).saveEntry(thread);
    this.#bs.broadcast({
      type: ChatActionTypes.UPDATE_MESSAGE,
      payload: payload
    });
    return payload.messageId;
  };

  private _findThread = async (
    threadId: string,
    currentUser: AuthContext["currentUser"]
  ) =>
    await this.#adg
      .dbBySchoolId(currentUser.schoolId)
      .findEntry(modelTypes.thread, {
        _id: threadId
      });

  private _getLastItem = (arr: any[]) => arr[arr.length - 1];
}
