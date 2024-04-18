import { Service } from "typedi";

import { ProgramRequestHandler } from "./requestHandlers/program.request.handler";
import { UserRequestHandler } from "./requestHandlers/user.request.handler";
import { ResultRequestHandler } from "./requestHandlers/result.request.handler";

import { OperationRequestHandler } from "./requestHandlers/operation.request.handler";
import { CollectionRequestHandler } from "./requestHandlers/collection.request.handler";
import { noop } from "lodash";
import { AuthRequestHandler } from "./requestHandlers/auth.request.handler";

@Service()
export default class RequestService {
  #userRequests: UserRequestHandler;
  #programRequests: ProgramRequestHandler;
  #resultRequests: ResultRequestHandler;
  #collectionRequests: CollectionRequestHandler;
  #operationsRequests: OperationRequestHandler;
  #authRequests: AuthRequestHandler;

  // Kill this and just get each with injection!
  constructor(
    ur: UserRequestHandler,
    pr: ProgramRequestHandler,
    rr: ResultRequestHandler,
    cr: CollectionRequestHandler,
    or: OperationRequestHandler,
    ar: AuthRequestHandler
  ) {
    this.#userRequests = ur;
    this.#programRequests = pr;
    this.#collectionRequests = cr;
    this.#resultRequests = rr;
    this.#operationsRequests = or;
    this.#authRequests = ar;
  }

  get auth() {
    return this.#authRequests;
  }

  get user() {
    return this.#userRequests;
  }

  get program() {
    return this.#programRequests;
  }

  get result() {
    return this.#resultRequests;
  }

  get collection() {
    return this.#collectionRequests;
  }

  get operation() {
    return this.#operationsRequests;
  }

  get appControls() {
    return noop();
  }
}
