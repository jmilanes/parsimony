import {
  IAddMessagePayload,
  ICreateThreadPayload,
  IDeleteMessagePayload,
  IDeleteThreadPayload,
  IEditMessagePayload,
  IThread
} from "@parsimony/types";
import { createQueryRequestFn, createMutationRequestFn } from "../../utils";
import operationStrings from "../operationStrings";

export const fetchTreads = createQueryRequestFn<IThread[]>(
  operationStrings.threads.fetchThreads
);

export const createThread = createMutationRequestFn<ICreateThreadPayload>(
  operationStrings.threads.createThread
);

export const deleteThread = createMutationRequestFn<IDeleteThreadPayload>(
  operationStrings.threads.deleteThread
);

export const addMessage = createMutationRequestFn<IAddMessagePayload>(
  operationStrings.threads.addMessage
);

export const deleteMessage = createMutationRequestFn<IDeleteMessagePayload>(
  operationStrings.threads.deleteMessage
);

export const editMessage = createMutationRequestFn<IEditMessagePayload>(
  operationStrings.threads.editMessage
);
