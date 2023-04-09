import Store from "../../services/store";
import { Collections, Collections$ } from "@parsimony/types";
import { ProgramAsyncDataHandler } from "./AsyncDataHandlers/programAsyncData.handler";
import { UserAsyncDataHandler } from "./AsyncDataHandlers/userAsyncData.handler";
import { ResultAsyncDataHandler } from "./AsyncDataHandlers/resultAsyncData.handler";
import { SchoolAsyncDataHandler } from "./AsyncDataHandlers/schoolAsyncData.handler";
import { DocumentAsyncDataHandler } from "./AsyncDataHandlers/documentAsyncData.handler";
import { EventAsyncDataHandler } from "./AsyncDataHandlers/eventAsyncData.handler";
import { FileAsyncDataHandler } from "./AsyncDataHandlers/fileAsyncData.handler";
import ChatService from "../../services/chat.service";
import { ISocket$ } from "../../services/app.service";
import { Container } from "typedi";

//TODO Refactor when DI is added
export const createDataAccessServices = async (
  store: Store,
  socket$: ISocket$
) => {
  return {
    [Collections.Program]: Container.get(ProgramAsyncDataHandler),
    [Collections.User]: Container.get(UserAsyncDataHandler),
    [Collections.Result]: Container.get(ResultAsyncDataHandler),
    [Collections.School]: Container.get(SchoolAsyncDataHandler),
    [Collections.Document]: Container.get(DocumentAsyncDataHandler),
    [Collections.Event]: Container.get(EventAsyncDataHandler),
    [Collections.File]: Container.get(FileAsyncDataHandler),
    [Collections$.Thread$]: new ChatService(socket$, store)
  };
};
