import { Service } from "typedi";

import CoreApi from "../../domains/coreApi/coreApi.service";
import { Domains } from "@parsimony/types";

@Service()
export class ActionUtiltites {
  #api: CoreApi;

  constructor(_api: CoreApi) {
    this.#api = _api;
  }

  public getClient = (clientId?: string) => {
    if (!clientId) return;
    return this.#api.getItem(Domains.User, clientId);
  };
}
