import { ServiceTypes, StoreCollections } from "@parsimony/types";
import ChatService from "./chat.service";
import FilterService from "./filter.service";
import StateService from "./state.service";
import Store from "./store";
import AuthService from "./auth.service";
import AppControlsService from "./appControls.service";
import { ProgramAsyncDataHandler } from "../domains/asyncData/AsyncDataHandlers/programAsyncData.handler";
import { UserAsyncDataHandler } from "../domains/asyncData/AsyncDataHandlers/userAsyncData.handler";
import { ResultAsyncDataHandler } from "../domains/asyncData/AsyncDataHandlers/resultAsyncData.handler";
import { EventAsyncDataHandler } from "../domains/asyncData/AsyncDataHandlers/eventAsyncData.handler";
import { DocumentAsyncDataHandler } from "../domains/asyncData/AsyncDataHandlers/documentAsyncData.handler";
import { FileAsyncDataHandler } from "../domains/asyncData/AsyncDataHandlers/fileAsyncData.handler";
import { Container, Inject, Service } from "typedi";
import { SocketService } from "../domains/asyncData/SocketService/socket.service";
import { SchoolAsyncDataHandler } from "../domains/asyncData/AsyncDataHandlers/schoolAsyncData.handler";

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
    [StoreCollections.School]: any;
    [StoreCollections.User]: UserAsyncDataHandler;
    [StoreCollections.Program]: ProgramAsyncDataHandler;
    [StoreCollections.Result]: ResultAsyncDataHandler;
    [StoreCollections.Event]: EventAsyncDataHandler;
    [StoreCollections.Document]: DocumentAsyncDataHandler;
    [StoreCollections.File]: FileAsyncDataHandler;
    [StoreCollections.Thread]: ChatService;
  };
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

  constructor(
    store: Store,
    ss: StateService,
    fs: FilterService,
    acs: AppControlsService,
    as: AuthService,
    socketService: SocketService,
    cs: ChatService
  ) {
    this.stateService = ss;
    this.store = store;
    this.filterService = fs;
    this.appControlsService = acs;
    this.authService = as;
    this.socketService = socketService;
    this.chat = cs;
    this.services = {
      [ServiceTypes.AppControls]: this.appControlsService,
      [ServiceTypes.AuthService]: this.authService,
      [ServiceTypes.Store]: this.store,
      [ServiceTypes.StateManager]: this.stateService,
      [ServiceTypes.Filter]: this.filterService,
      [ServiceTypes.DataAccess]: {
        [StoreCollections.Program]: Container.get(ProgramAsyncDataHandler),
        [StoreCollections.User]: Container.get(UserAsyncDataHandler),
        [StoreCollections.Result]: Container.get(ResultAsyncDataHandler),
        [StoreCollections.School]: Container.get(SchoolAsyncDataHandler),
        [StoreCollections.Document]: Container.get(DocumentAsyncDataHandler),
        [StoreCollections.Event]: Container.get(EventAsyncDataHandler),
        [StoreCollections.File]: Container.get(FileAsyncDataHandler),
        // This needs to an Async Handler for Message and threads
        [StoreCollections.Thread]: Container.get(ChatService)
      }
    } as Services;
  }

  public init = async () => {
    this.services[ServiceTypes.AppControls].init();
    await this.authService.init();
    await this.chat.init();
    console.log("All Services Loads", this.services);
  };
}
