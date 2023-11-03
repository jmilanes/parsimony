import { Service } from "typedi";

import { IOrchestrationHandler } from "../orchestrationHandler.interface";
import RequestService from "../../../requests/request.Service";
import ChatService from "../../../services/chat.service";
import AppStateService, { AppState } from "../../../state/appStateService";

export interface AppStartOrchestrationOptions {}

/**
 * State up data
 */
@Service()
export class AppStartOrchestrationHandler implements IOrchestrationHandler {
  #rs: RequestService;
  #cs: ChatService;
  #ac: AppStateService;

  constructor(rs: RequestService, cs: ChatService, ac: AppStateService) {
    this.#rs = rs;
    this.#cs = cs;
    this.#ac = ac;
  }

  //@ts-ignore
  public requestData = async (options: AppStartOrchestrationOptions) => {
    await this.#rs.requests?.user?.getAll();
    await this.#cs.init();
    await this.#ac.init();
  };
}
