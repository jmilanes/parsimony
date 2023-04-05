import Store from "../../services/store";
import { Collections, Collections$ } from "@parsimony/types";
import { ProgramAsyncDataHandler } from "./AsyncDataHandlers/programAsyncData.handler";
import {
  documentRequests,
  eventRequests,
  fileRequests,
  programRequests,
  resultRequests,
  schoolRequests,
  userRequests
} from "@parsimony/bal/dist";
import { UserAsyncDataHandler } from "./AsyncDataHandlers/userAsyncData.handler";
import { ResultAsyncDataHandler } from "./AsyncDataHandlers/resultAsyncData.handler";
import { SchoolAsyncDataHandler } from "./AsyncDataHandlers/schoolAsyncData.handler";
import { DocumentAsyncDataHandler } from "./AsyncDataHandlers/documentAsyncData.handler";
import { EventAsyncDataHandler } from "./AsyncDataHandlers/eventAsyncData.handler";
import { FileAsyncDataHandler } from "./AsyncDataHandlers/fileAsyncData.handler";
import ChatService from "../../services/chat.service";
import { ISocket$ } from "../../services/app.service";

//TODO Refactor when DI is added
export const createDataAccessServices = async (
  store: Store,
  socket$: ISocket$
) => {
  return {
    [Collections.Program]: new ProgramAsyncDataHandler(
      Collections.Program,
      programRequests,
      store
    ),
    [Collections.User]: new UserAsyncDataHandler(
      Collections.User,
      userRequests,
      store
    ),
    [Collections.Result]: new ResultAsyncDataHandler(
      Collections.Result,
      resultRequests,
      store
    ),
    [Collections.School]: new SchoolAsyncDataHandler(
      Collections.School,
      schoolRequests,
      store
    ),
    [Collections.Document]: new DocumentAsyncDataHandler(
      Collections.Document,
      documentRequests,
      store
    ),
    [Collections.Event]: new EventAsyncDataHandler(
      Collections.Event,
      eventRequests,
      store
    ),
    [Collections.File]: new FileAsyncDataHandler(
      Collections.File,
      fileRequests,
      store
    ),
    [Collections$.Thread$]: new ChatService(socket$, store)
  };
};
