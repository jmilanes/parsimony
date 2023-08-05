import { Service } from "typedi";

import CoreApi from "../../domains/coreApi/coreApi.service";
import { Domains } from "@parsimony/types";
import { ActionUtiltites } from "./utilities.actions";

@Service()
export class ProgramViewerActions {
  #api: CoreApi;
  #utils: ActionUtiltites;

  constructor(_api: CoreApi, utils: ActionUtiltites) {
    this.#api = _api;
    this.#utils = utils;
  }

  public state = () => {
    return this.#api.getAppState("programViewer");
  };

  public getSelectedClient = () => {
    const { clientId } = this.state();
    return this.#utils.getClient(clientId);
  };
}
