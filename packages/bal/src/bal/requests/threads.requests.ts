import {
  CreateThreadPayload,
  DeleteThreadPayload,
  Thread,
  GetAllThreadsByRelationshipPayload,
  AddMessagePayload,
  DeleteMessagePayload,
  EditMessagePayload,
  GetThreadPayload,
  UpdateThreadPayload
} from "@parsimony/types";
import { createRequest } from "../../utils";
import threadOperationStrings from "./operationStrings/threadOperationStrings";

export const getAllThreads = createRequest<void, Thread[]>(
  threadOperationStrings.fetchThreads
);

export const getThread = createRequest<GetThreadPayload, Thread>(
  threadOperationStrings.getThread
);

export const updateThread = createRequest<UpdateThreadPayload, Thread>(
  threadOperationStrings.updateThread
);

export const getAllThreadsByRelationship = createRequest<
  GetAllThreadsByRelationshipPayload,
  Thread[]
>(threadOperationStrings.getAllThreadsByRelationship);

export const createThread = createRequest<CreateThreadPayload, Thread>(
  threadOperationStrings.createThread
);

export const deleteThread = createRequest<DeleteThreadPayload, string>(
  threadOperationStrings.deleteThread
);

export const addMessage = createRequest<AddMessagePayload, void>(
  threadOperationStrings.addMessage
);

export const deleteMessage = createRequest<DeleteMessagePayload, void>(
  threadOperationStrings.deleteMessage
);

export const editMessage = createRequest<EditMessagePayload, void>(
  threadOperationStrings.editMessage
);

export const threadRequests = {
  getAll: getAllThreads,
  get: getThread,
  update: updateThread,
  getAllByRelationship: getAllThreadsByRelationship,
  create: createThread,
  delete: deleteThread,
  addMessage,
  deleteMessage,
  editMessage
};
