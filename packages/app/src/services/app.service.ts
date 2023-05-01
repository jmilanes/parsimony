import { Container, Inject, Service } from "typedi";

import { ServiceTypes, Domains } from "@parsimony/types";
import ChatService from "./chat.service";
import FilterService from "./filter.service";
import StateService from "./state.service";
import Store from "./store";
import AuthService from "./auth.service";
import AppControlsService from "./appControls.service";
import { ProgramAsyncDataHandler } from "../domains/requests/AsyncDataHandlers/programAsyncData.handler";
import { UserAsyncDataHandler } from "../domains/requests/AsyncDataHandlers/userAsyncData.handler";
import { ResultAsyncDataHandler } from "../domains/requests/AsyncDataHandlers/resultAsyncData.handler";
import { EventAsyncDataHandler } from "../domains/requests/AsyncDataHandlers/eventAsyncData.handler";
import { DocumentAsyncDataHandler } from "../domains/requests/AsyncDataHandlers/documentAsyncData.handler";
import { FileAsyncDataHandler } from "../domains/requests/AsyncDataHandlers/fileAsyncData.handler";
import { SocketService } from "../domains/requests/SocketService/socket.service";
import { SchoolAsyncDataHandler } from "../domains/requests/AsyncDataHandlers/schoolAsyncData.handler";
import { ThreadAsyncDataHandler } from "../domains/requests/AsyncDataHandlers/threadAsyncData.handler";
import { CommandService } from "../domains/commands/command.service";
import RequestService from "../domains/requests/request.Service";

export type Services = {
  [ServiceTypes.Chat]: ChatService;
  [ServiceTypes.CommandService]: CommandService;
  [ServiceTypes.Store]: Store;
  [ServiceTypes.StateManager]: StateService;
  [ServiceTypes.Filter]: FilterService;
  [ServiceTypes.AuthService]: AuthService;
  [ServiceTypes.AppControls]: AppControlsService;
  //TODO Pull this into an interface:
  [ServiceTypes.DataAccess]: {
    [Domains.School]: SchoolAsyncDataHandler;
    [Domains.User]: UserAsyncDataHandler;
    [Domains.Program]: ProgramAsyncDataHandler;
    [Domains.Result]: ResultAsyncDataHandler;
    [Domains.Event]: EventAsyncDataHandler;
    [Domains.Document]: DocumentAsyncDataHandler;
    [Domains.File]: FileAsyncDataHandler;
    [Domains.Thread]: ThreadAsyncDataHandler;
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

  @Inject(() => CommandService)
  private readonly commands: CommandService;

  @Inject(() => RequestService)
  private readonly requestService: RequestService;

  constructor(
    store: Store,
    ss: StateService,
    fs: FilterService,
    acs: AppControlsService,
    as: AuthService,
    socketService: SocketService,
    cs: ChatService,
    commands: CommandService,
    requestService: RequestService
  ) {
    this.stateService = ss;
    this.store = store;
    this.commands = commands;
    this.requestService = requestService;
    this.filterService = fs;
    this.appControlsService = acs;
    this.authService = as;
    this.socketService = socketService;
    this.chat = cs;
    this.services = {
      [ServiceTypes.AppControls]: this.appControlsService,
      [ServiceTypes.CommandService]: this.commands,
      [ServiceTypes.AuthService]: this.authService,
      [ServiceTypes.Store]: this.store,
      [ServiceTypes.StateManager]: this.stateService,
      [ServiceTypes.Filter]: this.filterService,
      [ServiceTypes.DataAccess]: {
        [Domains.Program]: Container.get(ProgramAsyncDataHandler),
        [Domains.User]: Container.get(UserAsyncDataHandler),
        [Domains.Result]: Container.get(ResultAsyncDataHandler),
        [Domains.School]: Container.get(SchoolAsyncDataHandler),
        [Domains.Document]: Container.get(DocumentAsyncDataHandler),
        [Domains.Event]: Container.get(EventAsyncDataHandler),
        [Domains.File]: Container.get(FileAsyncDataHandler),
        [Domains.Thread]: Container.get(ThreadAsyncDataHandler)
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
