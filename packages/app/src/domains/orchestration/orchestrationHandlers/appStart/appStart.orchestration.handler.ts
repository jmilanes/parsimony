import { Service } from "typedi";

import { IOrchestrationHandler } from "../orchestrationHandler.interface";
import RequestService from "../../../requests/request.Service";

import AppStateService from "../../../state/appState/appStateService";

export interface AppStartOrchestrationOptions {}

/**
 * State up data
 */
@Service()
export class AppStartOrchestrationHandler implements IOrchestrationHandler {
  #rs: RequestService;
  #ac: AppStateService;

  constructor(rs: RequestService, ac: AppStateService) {
    this.#rs = rs;
    this.#ac = ac;
  }

  //@ts-ignore
  public requestData = async (options: AppStartOrchestrationOptions) => {
    await this.#rs?.user?.getAll();
    await this.#ac.init();
  };
}
