import { Container, Service } from "typedi";
import { Domains } from "@parsimony/types";

import { ProgramAsyncDataHandler } from "./AsyncDataHandlers/programAsyncData.handler";
import { UserAsyncDataHandler } from "./AsyncDataHandlers/userAsyncData.handler";
import { ResultAsyncDataHandler } from "./AsyncDataHandlers/resultAsyncData.handler";
import { SchoolAsyncDataHandler } from "./AsyncDataHandlers/schoolAsyncData.handler";
import { DocumentAsyncDataHandler } from "./AsyncDataHandlers/documentAsyncData.handler";
import { EventAsyncDataHandler } from "./AsyncDataHandlers/eventAsyncData.handler";
import { FileAsyncDataHandler } from "./AsyncDataHandlers/fileAsyncData.handler";
import { ThreadAsyncDataHandler } from "./AsyncDataHandlers/threadAsyncData.handler";
import { CollectionAsyncDataHandler } from "./AsyncDataHandlers/collectionAsyncData.handler";

export interface RequestsTypeMap {
  [Domains.Program]: ProgramAsyncDataHandler;
  [Domains.User]: UserAsyncDataHandler;
  [Domains.Result]: ResultAsyncDataHandler;
  [Domains.School]: SchoolAsyncDataHandler;
  [Domains.Document]: DocumentAsyncDataHandler;
  [Domains.Event]: EventAsyncDataHandler;
  [Domains.File]: FileAsyncDataHandler;
  [Domains.Thread]: ThreadAsyncDataHandler;
  [Domains.Collection]: CollectionAsyncDataHandler;
  [Domains.AppControls]: ThreadAsyncDataHandler;
}

@Service()
export default class RequestService {
  public requests: Partial<Record<Domains, any>>;

  constructor() {
    this.requests = {
      [Domains.Program]: Container.get(ProgramAsyncDataHandler),
      [Domains.User]: Container.get(UserAsyncDataHandler),
      [Domains.Result]: Container.get(ResultAsyncDataHandler),
      [Domains.School]: Container.get(SchoolAsyncDataHandler),
      [Domains.Document]: Container.get(DocumentAsyncDataHandler),
      [Domains.Event]: Container.get(EventAsyncDataHandler),
      [Domains.File]: Container.get(FileAsyncDataHandler),
      [Domains.Collection]: Container.get(CollectionAsyncDataHandler),
      [Domains.Thread]: Container.get(ThreadAsyncDataHandler)
    };
  }
}
