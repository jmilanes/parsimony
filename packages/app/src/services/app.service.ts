import { Inject, Service } from "typedi";

import { DATA_HANDLERS } from "../domains/orchestration/orchestrationHandlers/handlers.typemap";
import UIApi from "../domains/uiApi/uiApi.Service";

@Service()
export default class AppController {
  @Inject(() => UIApi)
  private readonly API: UIApi;

  constructor(api: UIApi) {
    this.API = api;
  }

  public init = async () => {
    await this.API.Auth.init();
    await this.API.OrchestrationService.setupData(DATA_HANDLERS.APP_START, {});
  };
}
