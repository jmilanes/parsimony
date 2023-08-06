import { Service } from "typedi";
import OrchestrationService from "../orchestration/orchestration.service";
import {
  DATA_HANDLERS,
  OrchestrationHandlerOptionsTypeMap
} from "../orchestration/orchestrationHandlers/handlers.typemap";
import Store, { DomainReturnTypeMap } from "../store/store";
import { Domains } from "@parsimony/types";
import AppStateService, { AppState } from "../../services/appStateService";

import RequestService, { RequestsTypeMap } from "../requests/request.Service";
import AuthService from "../../services/auth.service";
import StateService from "../../services/state.service";

/**
 * API Between service and UI Layer
 *
 *
 */
@Service()
export default class CoreApi {
  #os: OrchestrationService;
  #ass: AppStateService;
  #rs: RequestService;
  #store: Store;
  #auth: AuthService;
  #ss: StateService;

  constructor(
    os: OrchestrationService,
    s: Store,
    ass: AppStateService,
    rs: RequestService,
    auth: AuthService,
    ss: StateService
  ) {
    this.#os = os;
    this.#store = s;
    this.#ass = ass;
    this.#rs = rs;
    this.#auth = auth;
    this.#ss = ss;
  }

  public get Auth() {
    return this.#auth;
  }

  public get StateService() {
    return this.#ss;
  }

  public get OrchestrationService() {
    return this.#os;
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
  public updateAppState = <K extends keyof AppState>(
    appStateKey: K,
    update: Partial<AppState[K]>
  ) => {
    this.#ass.updateAppState(appStateKey, update);
  };

  public getAppState = <K extends keyof AppState>(
    appStateKey: K
  ): AppState[K] => {
    return this.#store.getValueByPath(Domains.AppState, appStateKey);
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
