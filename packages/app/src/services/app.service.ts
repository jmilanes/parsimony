import { Collections, ServiceTypes } from "@parsimony/types/src";
import { Observable } from "rxjs";
import ChatService from "./chat.service";
import FilterService from "./filter.service";
import StateService from "./state.service";
import Store from "./store";

import crudGenerator from "./crudGenerators/crudGeneratorWithLocalStorage";
import {
  CreateProgramPayload,
  CreateResultPayload,
  CreateUserPayload,
  DeleteProgramPayload,
  DeleteResultPayload,
  DeleteUserPayload,
  GetProgramPayload,
  GetResultPayload,
  GetUserPayload,
  Result,
  UpdateProgramPayload,
  UpdateResultPayload,
  UpdateUserPayload
} from "@parsimony/types";
import { ISchool, User, Program } from "@parsimony/types";
import userRequests from "../bal/requests/users.requests";
import programRequests from "../bal/requests/programs.requests";
import resultRequests from "../bal/requests/results.requests";
import { AsyncCrudGenerator } from "./crudGenerators/asyncCrud.generator";
import AuthService from "./auth.service";

export type Services = {
  [ServiceTypes.Chat]: ChatService;
  [ServiceTypes.Store]: Store;
  [ServiceTypes.StateManager]: StateService;
  [ServiceTypes.Filter]: FilterService;
  [ServiceTypes.AuthService]: AuthService;
  [ServiceTypes.DataAccess]: {
    [Collections.School]: any;
    [Collections.User]: any;
    [Collections.Program]: any;
    [Collections.Result]: any;
  };
};

export type ISocket$ = Observable<any>;
export default class AppController {
  isLoading: boolean;
  socket$?: ISocket$;
  services: Services;
  constructor() {
    this.isLoading = true;
    this.services = {} as Services;
  }

  init = () => {
    this._initWebSocket();
    this._initServices();
    this._initDataAccess();
    this._initAuthService(this.services.dataAccess.user);
    this._initChatService(this.socket$ as ISocket$);
    console.log("All Services Loads", this.services);
  };

  private _initWebSocket = () => {
    const webSocket = new WebSocket("ws://localhost:8080");
    webSocket.onopen = () => console.log("User connection opened!");
    this.socket$ = new Observable((subscriber) => {
      webSocket.onmessage = (message: any) => {
        const messageJSON = JSON.parse(message.data);
        console.info("Web Socket Update:", messageJSON);
        subscriber.next(messageJSON);
      };
    });
  };

  private _initChatService = (socket$: ISocket$) => {
    this.services[ServiceTypes.Chat] = new ChatService(socket$);
  };

  private _initServices = () => {
    this.services[ServiceTypes.Store] = new Store();
    this.services[ServiceTypes.StateManager] = new StateService(
      this.services.store
    );
    this.services[ServiceTypes.Filter] = new FilterService(
      this.services.stateManager
    );
  };

  private _initDataAccess = () => {
    this.services.dataAccess = createDataAccessServices(
      this.services.store as Store
    );
  };

  private _initAuthService = (userDataAccess: any) => {
    const currentUserId = userDataAccess.get(
      localStorage.getItem("currentUserId") || ""
    );
    this.services.authService = new AuthService(
      userDataAccess.subscribe,
      currentUserId
    );
  };
}

export const createDataAccessServices = (store: Store) => {
  const UserService = new AsyncCrudGenerator<
    User,
    CreateUserPayload,
    DeleteUserPayload,
    UpdateUserPayload,
    GetUserPayload
  >(Collections.User, userRequests, store);

  const ProgramService = new AsyncCrudGenerator<
    Program,
    CreateProgramPayload,
    DeleteProgramPayload,
    UpdateProgramPayload,
    GetProgramPayload
  >(Collections.Program, programRequests, store);

  const ResultService = new AsyncCrudGenerator<
    Result,
    CreateResultPayload,
    DeleteResultPayload,
    UpdateResultPayload,
    GetResultPayload
  >(Collections.Result, resultRequests, store);

  const SchoolService = crudGenerator<ISchool>(Collections.School);

  UserService.init();
  ProgramService.init();
  ResultService.init();

  return {
    [Collections.Program]: ProgramService,
    [Collections.User]: UserService,
    [Collections.Result]: ResultService,
    [Collections.School]: SchoolService
  };
};
