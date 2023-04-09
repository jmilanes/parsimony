import { Collections, Collections$, ServiceTypes } from "@parsimony/types";
import { Observable } from "rxjs";
import ChatService from "./chat.service";
import FilterService from "./filter.service";
import StateService from "./state.service";
import Store from "./store";
import AuthService from "./auth.service";
import AppControlsService, { AppControls } from "./appControls.service";
import { envIs } from "@parsimony/utilities";
import { ProgramAsyncDataHandler } from "../domains/asyncData/AsyncDataHandlers/programAsyncData.handler";
import { UserAsyncDataHandler } from "../domains/asyncData/AsyncDataHandlers/userAsyncData.handler";
import { ResultAsyncDataHandler } from "../domains/asyncData/AsyncDataHandlers/resultAsyncData.handler";
import { EventAsyncDataHandler } from "../domains/asyncData/AsyncDataHandlers/eventAsyncData.handler";
import { DocumentAsyncDataHandler } from "../domains/asyncData/AsyncDataHandlers/documentAsyncData.handler";
import { FileAsyncDataHandler } from "../domains/asyncData/AsyncDataHandlers/fileAsyncData.handler";
import { createDataAccessServices } from "../domains/asyncData/createDataAccessServices";
import { Inject, Service } from "typedi";

export type Services = {
  [ServiceTypes.App]: {
    isLoading: boolean;
  };
  [ServiceTypes.Chat]: ChatService;
  [ServiceTypes.Store]: Store;
  [ServiceTypes.StateManager]: StateService;
  [ServiceTypes.Filter]: FilterService;
  [ServiceTypes.AuthService]: AuthService;
  [ServiceTypes.AppControls]: AppControlsService;
  [ServiceTypes.DataAccess]: {
    [Collections.School]: any;
    // TODO: Current User
    [Collections.User]: UserAsyncDataHandler;
    [Collections.Program]: ProgramAsyncDataHandler;
    [Collections.Result]: ResultAsyncDataHandler;
    [Collections.Event]: EventAsyncDataHandler;
    [Collections.Document]: DocumentAsyncDataHandler;
    [Collections.File]: FileAsyncDataHandler;
    [Collections$.Thread$]: ChatService;
  };
};

export type ISocket$ = Observable<any>;

@Service()
export default class AppController {
  socket$?: ISocket$;
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

  constructor(
    store: Store,
    ss: StateService,
    fs: FilterService,
    acs: AppControlsService,
    as: AuthService
  ) {
    this.stateService = ss;
    this.store = store;
    this.filterService = fs;
    this.appControlsService = acs;
    this.authService = as;
    this.services = {
      [ServiceTypes.AppControls]: this.appControlsService,
      [ServiceTypes.AuthService]: this.authService,
      //TODO Move to app controls
      [ServiceTypes.App]: {
        isLoading: true
      },
      [ServiceTypes.Store]: this.store,
      [ServiceTypes.StateManager]: this.stateService,
      [ServiceTypes.Filter]: this.filterService
    } as Services;
  }

  public init = async () => {
    await this.#initWebSocket();
    this.services[ServiceTypes.AppControls].init();
    await this.#initDataAccess();
    await this.authService.init();
    await this.#loadCollections();
    console.log("All Services Loads", this.services);
  };

  #loadCollections = async () => {
    await this.services.dataAccess.thread$.init();
    await this.#isLoading(false);
    console.log("All Data Loaded");
  };

  #isLoading = async (isLoading: boolean) => {
    this.services[ServiceTypes.App].isLoading = isLoading;
    this.services.stateManager.updateState();
  };

  // TODO: MOVE TO A CLASS and into Async/Data Domain
  #initWebSocket = async () => {
    const SOCKET_URL = envIs("prod")
      ? "wss://broadcast.parsimony.app"
      : "ws://localhost:8080";
    const webSocket = new WebSocket(SOCKET_URL);
    webSocket.onopen = () => console.log("User connection opened!");
    this.socket$ = new Observable((subscriber) => {
      webSocket.onmessage = (message: any) => {
        const messageJSON = JSON.parse(message.data);
        console.info("Web Socket Update:", messageJSON);
        subscriber.next(messageJSON);
      };
    });
  };

  #initDataAccess = async () => {
    // ** This is where I could just swap out the local storage version
    this.services[ServiceTypes.DataAccess] = await createDataAccessServices(
      this.services.store as Store,
      this.socket$ as ISocket$
    );
  };
}
