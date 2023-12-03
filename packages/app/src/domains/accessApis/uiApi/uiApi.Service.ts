import { Service } from "typedi";

import { useNavigate } from "react-router-dom";

import { ActionDomainService } from "../../state/appState/action.domain.service";
import CoreApi from "../coreApi/coreApi.service";
import SharedUtilitiesService from "../../sharedUtilities/sharedUtilities.service";

/**
 * API Between service and UI Layer
 *
 *
 */
@Service()
export default class UIApi {
  #coreApi: CoreApi;
  #actions: ActionDomainService;
  #utils: SharedUtilitiesService;

  constructor(
    coreApi: CoreApi,
    actions: ActionDomainService,
    utils: SharedUtilitiesService
  ) {
    this.#coreApi = coreApi;
    this.#actions = actions;
    this.#utils = utils;
  }

  public get system() {
    return this.#coreApi;
  }

  public get Navigate() {
    return useNavigate();
  }

  public get actions() {
    return this.#actions;
  }

  public get utils() {
    return this.#utils;
  }
}
