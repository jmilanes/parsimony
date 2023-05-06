import { Container, Service } from "typedi";
import { Domains } from "@parsimony/types";

import { ProgramRequestHandler } from "./requestHandlers/program.request.handler";
import { UserRequestHandler } from "./requestHandlers/user.request.handler";
import { ResultRequestHandler } from "./requestHandlers/result.request.handler";
import { SchoolRequestHandler } from "./requestHandlers/school.request.handler";
import { DocumentRequestHandler } from "./requestHandlers/document.request.handler";
import { EventRequestHandler } from "./requestHandlers/event.request.handler";
import { FileRequestHandler } from "./requestHandlers/file.request.handler";
import { ThreadRequestHandler } from "./requestHandlers/thread.request.handler";
import { CollectionRequestHandler } from "./requestHandlers/collection.request.handler";
import { IRequestHandler } from "./IRequestHandler";

export interface RequestsTypeMap {
  [Domains.Program]: ProgramRequestHandler;
  [Domains.User]: UserRequestHandler;
  [Domains.Result]: ResultRequestHandler;
  [Domains.School]: SchoolRequestHandler;
  [Domains.Document]: DocumentRequestHandler;
  [Domains.Event]: EventRequestHandler;
  [Domains.File]: FileRequestHandler;
  [Domains.Thread]: ThreadRequestHandler;
  [Domains.Collection]: CollectionRequestHandler;
  [Domains.AppControls]: ThreadRequestHandler;
}

@Service()
export default class RequestService {
  public requests: Partial<
    Record<Domains, IRequestHandler<any, any, any, any, any, any>>
  >;

  constructor() {
    this.requests = {
      [Domains.Program]: Container.get(ProgramRequestHandler),
      [Domains.User]: Container.get(UserRequestHandler),
      [Domains.Result]: Container.get(ResultRequestHandler),
      [Domains.School]: Container.get(SchoolRequestHandler),
      [Domains.Document]: Container.get(DocumentRequestHandler),
      [Domains.Event]: Container.get(EventRequestHandler),
      [Domains.File]: Container.get(FileRequestHandler),
      [Domains.Collection]: Container.get(CollectionRequestHandler),
      [Domains.Thread]: Container.get(ThreadRequestHandler)
    };
  }
}
