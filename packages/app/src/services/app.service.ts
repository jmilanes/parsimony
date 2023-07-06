import { Inject, Service } from "typedi";

import ChatService from "./chat.service";
import FilterService from "./filter.service";
import StateService from "./state.service";
import Store from "../domains/store/store";
import AuthService from "./auth.service";
import AppStateService from "./appStateService";
import { SocketService } from "../domains/requests/socketService/socket.service";
import RequestService from "../domains/requests/request.Service";
import OrchestrationService from "../domains/orchestration/orchestration.service";
import { DATA_HANDLERS } from "../domains/orchestration/orchestrationHandlers/handlers.typemap";
import UIApi from "../domains/uiApi/uiApi.Service";
import ObservationService from "./observation.service";

@Service()
export default class AppController {
  @Inject(() => Store)
  private readonly store: Store;

  @Inject(() => StateService)
  private readonly stateService: StateService;

  @Inject(() => FilterService)
  private readonly filterService: FilterService;

  @Inject(() => AppStateService)
  private readonly appControlsService: AppStateService;

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

  @Inject(() => ObservationService)
  private readonly observation: ObservationService;

  @Inject(() => UIApi)
  private readonly API: UIApi;

  constructor(
    store: Store,
    ss: StateService,
    fs: FilterService,
    acs: AppStateService,
    as: AuthService,
    socketService: SocketService,
    cs: ChatService,
    requestService: RequestService,
    orchestration: OrchestrationService,
    api: UIApi,
    observation: ObservationService
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
    this.observation = observation;
    this.API = api;
  }

  public init = async () => {
    await this.authService.init();
    await this.orchestration.setupData(DATA_HANDLERS.APP_START, {});
  };
}
