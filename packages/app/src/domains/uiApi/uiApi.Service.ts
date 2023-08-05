import { Service } from "typedi";

import { useNavigate } from "react-router-dom";

import { ActionDomainService } from "../../actions/action.domain.service";
import CoreApi from "../coreApi/coreApi.service";

/**
 * API Between service and UI Layer
 *
 *
 */
@Service()
export default class UIApi {
  #coreApi: CoreApi;
  #actions: ActionDomainService;

  constructor(coreApi: CoreApi, actions: ActionDomainService) {
    this.#coreApi = coreApi;
    this.#actions = actions;
  }

  public get system() {
    return this.#coreApi;
  }

  public get Navigation() {
    return useNavigate();
  }

  public get actions() {
    return this.#actions;
  }
}
