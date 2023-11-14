import { Service } from "typedi";

import CoreApi from "../../../accessApis/coreApi/coreApi.service";
import { Domains } from "@parsimony/types/dist";
import { Toggles } from "../appState.types";

type CollectionID = string;

/*
  For all things that toggle off and on
 */
@Service()
export class ToggleActions {
  #api: CoreApi;

  constructor(_api: CoreApi) {
    this.#api = _api;
  }

  //TODO Make a base class with all the basics (state, getState....)
  state() {
    return this.#api.getAppState("toggles");
  }

  updateState(update: Partial<Toggles>) {
    return this.#api.updateAppState("toggles", update);
  }

  public getToggleActiveState(toggle: keyof Toggles) {
    return this.state()[toggle];
  }

  public setToggleActiveState(toggle: keyof Toggles, update: Boolean) {
    return this.updateState({
      [toggle]: update
    });
  }
}
