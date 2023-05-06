import { Inject, Service } from "typedi";

import { ServiceTypes } from "@parsimony/types";
import ChatService from "./chat.service";
import FilterService from "./filter.service";
import StateService from "./state.service";
import Store from "../domains/store/store";
import AuthService from "./auth.service";
import AppControlsService from "./appControls.service";
import { SocketService } from "../domains/requests/socketService/socket.service";
import RequestService from "../domains/requests/request.Service";
import OrchestrationService from "../domains/orchestration/orchestration.service";
import { DATA_HANDLERS } from "../domains/orchestration/orchestrationHandlers/handlers.typemap";
import UIApi from "../domains/uiApi/uiApi.Service";

export type Services = {
  [ServiceTypes.Chat]: ChatService;
  [ServiceTypes.Store]: Store;
  [ServiceTypes.StateManager]: StateService;
  [ServiceTypes.Filter]: FilterService;
  [ServiceTypes.AuthService]: AuthService;
  [ServiceTypes.AppControls]: AppControlsService;
};

@Service()
export default class AppController {
  services: Services;

  @Inject(() => Store)
  private readonly store: Store;

  @Inject(() => StateService)
  private readonly stateService: StateService;

  @Inject(() => FilterService)
  private readonly filterService: FilterService;

  @Inject(() => AppControlsService)
  private readonly appControlsService: AppControlsService;

  @Inject(() => AuthService)
  private readonly authService: AuthService;

  @Inject(() => SocketService)
  private readonly socketService: SocketService;

  @Inject(() => ChatService)
  private readonly chat: ChatService;

  @Inject(() => RequestService)
  private readonly requestService: RequestService;

  @Inject(() => OrchestrationService)
  private readonly orchestration: OrchestrationService;

  @Inject(() => UIApi)
  private readonly API: UIApi;

  constructor(
    store: Store,
    ss: StateService,
    fs: FilterService,
    acs: AppControlsService,
    as: AuthService,
    socketService: SocketService,
    cs: ChatService,
    requestService: RequestService,
    orchestration: OrchestrationService,
    api: UIApi
  ) {
    this.stateService = ss;
    this.store = store;
    this.requestService = requestService;
    this.filterService = fs;
    this.appControlsService = acs;
    this.authService = as;
    this.socketService = socketService;
    this.chat = cs;
    this.orchestration = orchestration;
    this.API = api;

    // TODO: KILL ALL OF THIS
    this.services = {
      [ServiceTypes.AppControls]: this.appControlsService,
      [ServiceTypes.AuthService]: this.authService,
      [ServiceTypes.Store]: this.store,
      [ServiceTypes.StateManager]: this.stateService,
      [ServiceTypes.Filter]: this.filterService
    } as Services;
  }

  public init = async () => {
    await this.authService.init();
    await this.orchestration.setupData(DATA_HANDLERS.APP_START, {});
  };
}
