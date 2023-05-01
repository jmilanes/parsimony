import { Service } from "typedi";

import { ICommandHandler } from "../comandHandler.interface";
import { Domains } from "@parsimony/types";

import RequestService from "../../../requests/request.Service";
import { AsyncDataHandlerInterface } from "../../../requests/asyncDataHandler.interface";

export class MakeRequestOptions {
  public declare domain: Domains;
  public declare requestType: keyof AsyncDataHandlerInterface<
    any,
    any,
    any,
    any,
    any,
    any
  >;
  //TODO Fix this
  public declare payload: Record<string, unknown> | unknown;
}

@Service()
export class MakeRequestCommandHandler implements ICommandHandler {
  #rs: RequestService;

  constructor(requestService: RequestService) {
    this.#rs = requestService;
  }

  //@ts-ignore
  public execute = (options: MakeRequestOptions) => {
    if (!options) return;
    this.#rs.requests[options.domain][options.requestType](options.payload);
  };
}
