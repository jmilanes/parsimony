import {
  AddMessagePayload,
  CreateThreadPayload,
  DeleteMessagePayload,
  DeleteThreadPayload,
  EditMessagePayload,
  Thread
} from "@parsimony/types";
import { createRequest } from "../../utils";
import threadOperationStrings from "./operationStrings/threadOperationStrings";

export const fetchTreads = createRequest<void, Thread[]>(
  threadOperationStrings.fetchThreads
);

export const createThread = createRequest<CreateThreadPayload, void>(
  threadOperationStrings.createThread
);

export const deleteThread = createRequest<DeleteThreadPayload, void>(
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
