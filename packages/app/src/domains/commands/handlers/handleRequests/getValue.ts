import { Service } from "typedi";

import Store from "../../../../services/store";
import { ICommandHandler } from "../comandHandler.interface";
import { Domains } from "@parsimony/types";
import { get } from "lodash";

export class GetValueOptions {
  public declare domain: Domains;
  public declare path: string;
}

@Service()
export class GetValueCommandHandler implements ICommandHandler {
  #store: Store;

  constructor(store: Store) {
    this.#store = store;
  }

  //@ts-ignore
  public execute = (options: GetValueOptions) => {
    return get(this.#store.getDomainValue(options.domain), options.path);
  };
}
