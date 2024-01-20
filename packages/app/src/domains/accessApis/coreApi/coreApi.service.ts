import { Service } from "typedi";
import OrchestrationService from "../../orchestration/orchestration.service";
import {
  DATA_HANDLERS,
  OrchestrationHandlerOptionsTypeMap
} from "../../orchestration/orchestrationHandlers/handlers.typemap";
import Store, { DomainReturnTypeMap } from "../../state/store/store";
import { Domains } from "@parsimony/types";
import { AppState } from "../../state/appState/appState.types";

import RequestService, {
  RequestsTypeMap
} from "../../requests/request.Service";
import AuthService from "../../services/auth.service";
import StateService from "../../state/state.service";
import { DialogControlService } from "../../controls/dialogControl.service";
import { FormService } from "../../forms/form.service";
import AppStateService from "../../state/appState/appStateService";

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
  #dcs: DialogControlService;
  #auth: AuthService;
  #ss: StateService;
  #fs: FormService;

  constructor(
    os: OrchestrationService,
    s: Store,
    dcs: DialogControlService,
    ass: AppStateService,
    rs: RequestService,
    auth: AuthService,
    ss: StateService,
    fs: FormService
  ) {
    this.#os = os;
    this.#store = s;
    this.#ass = ass;
    this.#rs = rs;
    this.#auth = auth;
    this.#ss = ss;
    this.#dcs = dcs;
    this.#fs = fs;
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

  public get Dialog() {
    return this.#dcs;
  }

  public get Form() {
    return this.#fs;
  }

  public get Requests() {
    return this.#rs;
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
    return this.#store.getAllItemsByDomain<RT>(d);
  };

  public getItem = <K extends Domains, RT extends DomainReturnTypeMap[K]>(
    d: K,
    id?: string
  ): RT => {
    if (!id) {
      throw new Error("Undefined id passed to getItem in UI API");
    }
    return this.#store.getItemByDomain<RT>(d, id);
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
    return this.#ass.getAppStateByKey(appStateKey);
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
