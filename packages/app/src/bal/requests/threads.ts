import {
  IAddMessagePayload,
  CreateThreadPayload,
  DeleteMessagePayload,
  DeletePayload,
  EditMessagePayload,
  Thread
} from "@parsimony/types";
import { createQueryRequestFn, createMutationRequestFn } from "../../utils";
import operationStrings from "../operationStrings";

export const fetchTreads = createQueryRequestFn<Thread[]>(
  operationStrings.threads.fetchThreads
);

export const createThread = createMutationRequestFn<CreateThreadPayload>(
  operationStrings.threads.createThread
);

// TODO Rename in Sever to DeleteThreadPAyload
export const deleteThread = createMutationRequestFn<DeletePayload>(
  operationStrings.threads.deleteThread
);

export const addMessage = createMutationRequestFn<IAddMessagePayload>(
  operationStrings.threads.addMessage
);

export const deleteMessage = createMutationRequestFn<DeleteMessagePayload>(
  operationStrings.threads.deleteMessage
);

export const editMessage = createMutationRequestFn<EditMessagePayload>(
  operationStrings.threads.editMessage
);
