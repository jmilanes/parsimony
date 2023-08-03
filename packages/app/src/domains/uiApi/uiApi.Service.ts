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
import { getActions, GetActionsReturnType } from "../../actions";
import ObservationService from "../../services/observation.service";
import AuthService from "../../services/auth.service";
import StateService from "../../services/state.service";
import { useNavigate } from "react-router-dom";
import { TimerActions } from "../../actions/appState/timer.actions";
import { TallyActions } from "../../actions/appState/tally.actions";
import { IntervalActions } from "../../actions/appState/interval.actions";
import { ResultActions } from "../../actions/appState/result.actions";

/**
 * API Between service and UI Layer
 *
 *
 */
@Service()
export default class UIApi {
  #os: OrchestrationService;
  #ops: ObservationService;
  #ass: AppStateService;
  #rs: RequestService;
  #store: Store;
  #auth: AuthService;
  #ss: StateService;
  actions: GetActionsReturnType;

  constructor(
    os: OrchestrationService,
    ops: ObservationService,
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
    this.#ops = ops;
    this.#auth = auth;
    this.#ss = ss;
    // Fix this
    this.actions = getActions(
      new TimerActions(this),
      new TallyActions(this),
      new IntervalActions(this),
      new ResultActions(this)
    );
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

  public get ObservationService() {
    return this.#ops;
  }

  public get Navigation() {
    return useNavigate();
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
