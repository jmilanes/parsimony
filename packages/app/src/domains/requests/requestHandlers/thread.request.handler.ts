import {
  Domains,
  Thread,
  CreateThreadPayload,
  DeleteThreadPayload,
  GetAllThreadsByRelationshipPayload,
  AddMessagePayload,
  DeleteMessagePayload,
  EditMessagePayload,
  UpdateThreadPayload,
  GetThreadPayload
} from "@parsimony/types";
import { IRequestHandler } from "../IRequestHandler";
import { threadRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class ThreadRequestHandler extends IRequestHandler<
  Thread,
  CreateThreadPayload,
  DeleteThreadPayload,
  UpdateThreadPayload,
  GetThreadPayload,
  GetAllThreadsByRelationshipPayload
> {
  domainName = Domains.Thread;

  requests = threadRequests;

  addMessage = async (payload: AddMessagePayload) => {
    await this.requests.addMessage(payload);
  };

  deleteMessage = async (payload: DeleteMessagePayload) => {
    await this.requests.deleteMessage(payload);
  };

  editMessage = async (payload: EditMessagePayload) => {
    await this.requests.editMessage(payload);
  };
}
