import { Service } from "typedi";

import Store from "../../../../services/store";
import { ICommandHandler } from "../comandHandler.interface";
import { Domains } from "@parsimony/types";

export class GetItemOptions {
  public declare domain: Domains;
  public declare id?: string;
}

@Service()
export class GetItemCommandHandler implements ICommandHandler {
  #store: Store;

  constructor(store: Store) {
    this.#store = store;
  }

  //@ts-ignore
  public execute = (options: GetItemOptions) => {
    if (options.id === undefined || options.id === null) {
      throw new Error(`No ID passed trying to get ${options.domain}`);
    }
    return this.#store.getDomainItem(options.domain, options.id);
  };
}
