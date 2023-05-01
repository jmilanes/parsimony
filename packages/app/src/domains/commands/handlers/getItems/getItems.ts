import { Service } from "typedi";
import { Domains } from "@parsimony/types";
import Store from "../../../../services/store";
import { ICommandHandler } from "../comandHandler.interface";

export class GetItemsOptions {
  public declare domain: Domains;
}

@Service()
export class GetItemsCommandHandler implements ICommandHandler {
  #store: Store;

  constructor(store: Store) {
    this.#store = store;
  }

  //@ts-ignore
  public execute = (options: GetItemsOptions) => {
    return this.#store.getCurrentDomainItems(options.domain);
  };
}
