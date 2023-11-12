import { DrawerContentTypes } from "../appState.types";

import { Service } from "typedi";
import CoreApi from "../../../accessApis/coreApi/coreApi.service";

@Service()
export class DrawerActions {
  #api: CoreApi;

  constructor(_api: CoreApi) {
    this.#api = _api;
  }

  public getDrawerState = () => {
    return this.#api.getAppState("drawer");
  };

  public open = (content: DrawerContentTypes) => {
    this.#api.updateAppState("drawer", {
      active: true,
      content
    });
  };

  //com

  public close = () => {
    this.#api.updateAppState("drawer", {
      active: false,
      content: undefined
    });
  };
}
