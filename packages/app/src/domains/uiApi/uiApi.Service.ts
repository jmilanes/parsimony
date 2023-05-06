import { Service } from "typedi";
import OrchestrationService from "../orchestration/orchestration.service";
import {
  DATA_HANDLERS,
  OrchestrationHandlerOptionsTypeMap
} from "../orchestration/orchestrationHandlers/handlers.typemap";
import Store, { DomainReturnTypeMap } from "../store/store";
import { Domains } from "@parsimony/types";
import AppControlsService, {
  AppControls,
  ControlPayloads
} from "../../services/appControls.service";

import RequestService, { RequestsTypeMap } from "../requests/request.Service";

/**
 * API Between service and UI Layer
 *
 *
 */
@Service()
export default class UIApi {
  #os: OrchestrationService;
  #acs: AppControlsService;
  #rs: RequestService;
  #store: Store;

  constructor(
    os: OrchestrationService,
    s: Store,
    acs: AppControlsService,
    rs: RequestService
  ) {
    this.#os = os;
    this.#store = s;
    this.#acs = acs;
    this.#rs = rs;
  }

  public setUpDataFor = async <K extends DATA_HANDLERS>(
    dh: DATA_HANDLERS,
    opts: OrchestrationHandlerOptionsTypeMap[K]
  ) => {
    await this.#os.setupData(dh, opts);
  };

  public getItemsFromStore = <
    K extends Domains,
    RT extends DomainReturnTypeMap[K]
  >(
    d: K
  ): RT[] => {
    return this.#store.getCurrentDomainItems<RT>(d);
  };

  public getItem = <K extends Domains, RT extends DomainReturnTypeMap[K]>(
    d: K,
    id?: string
  ): RT => {
    if (!id) {
      throw new Error("Undefined id passed to getItem in UI API");
    }
    return this.#store.getDomainItem<RT>(d, id);
  };

  public getStoreValueByPath = (d: Domains, path: string) => {
    return this.#store.getValueByPath(d, path);
  };

  //TODO: Make this more general maybe this just update "client side specific states control, add programs stuff"
  public updateAppControls = (
    path: keyof AppControls,
    update: ControlPayloads
  ) => {
    this.#acs.updateControls(path, update);
  };

  public makeRequest = async <K extends Domains>({
    domain,
    requestType,
    payload
  }: {
    domain: K;
    requestType: keyof RequestsTypeMap[K];
    payload?: Record<string, unknown> | unknown;
  }) => {
    //@ts-ignore
    await this.#rs.requests[domain][requestType](payload);
  };
}
