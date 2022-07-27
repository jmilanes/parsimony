import {
  AddMessagePayload,
  CreateThreadPayload,
  DeleteMessagePayload,
  DeletePayload,
  EditMessagePayload,
  Thread
} from "@parsimony/types";
import { createRequest } from "../../utils";
import operationStrings from "../operationStrings";

type threadResponse = {
  data: {
    threads: Thread[];
  };
};

export const fetchTreads = createRequest<void, threadResponse>(
  operationStrings.threads.fetchThreads
);

export const createThread = createRequest<CreateThreadPayload, void>(
  operationStrings.threads.createThread
);

// TODO Rename in Sever to DeleteThreadPAyload
export const deleteThread = createRequest<DeletePayload, void>(
  operationStrings.threads.deleteThread
);

export const addMessage = createRequest<AddMessagePayload, void>(
  operationStrings.threads.addMessage
);

export const deleteMessage = createRequest<DeleteMessagePayload, void>(
  operationStrings.threads.deleteMessage
);

export const editMessage = createRequest<EditMessagePayload, void>(
  operationStrings.threads.editMessage
);
