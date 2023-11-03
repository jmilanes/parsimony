import { Inject, Service } from "typedi";

import { DATA_HANDLERS } from "./orchestrationHandlers/handlers.typemap";
import UIApi from "../accessApis/uiApi/uiApi.Service";

@Service()
export default class AppController {
  @Inject(() => UIApi)
  private readonly API: UIApi;

  constructor(api: UIApi) {
    this.API = api;
  }

  public init = async () => {
    await this.API.system.Auth.init();
    await this.API.system.OrchestrationService.setupData(
      DATA_HANDLERS.APP_START,
      {}
    );
  };
}
