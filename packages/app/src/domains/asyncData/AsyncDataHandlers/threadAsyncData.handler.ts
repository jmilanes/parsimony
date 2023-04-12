import {
  StoreCollections,
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
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";
import { threadRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class ThreadAsyncDataHandler extends AsyncDataHandlerInterface<
  Thread,
  CreateThreadPayload,
  DeleteThreadPayload,
  UpdateThreadPayload,
  GetThreadPayload,
  GetAllThreadsByRelationshipPayload
> {
  collectionName = StoreCollections.Thread;

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
