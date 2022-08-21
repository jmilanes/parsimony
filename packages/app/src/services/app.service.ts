import {
  Collections,
  CreateSchoolPayload,
  DeleteSchoolPayload,
  GetSchoolPayload,
  ServiceTypes,
  UpdateSchoolPayload,
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
  UpdateUserPayload,
  User,
  Program,
  School
} from "@parsimony/types/src";
import { Observable } from "rxjs";
import ChatService from "./chat.service";
import FilterService from "./filter.service";
import StateService from "./state.service";
import Store from "./store";

import {
  userRequests,
  programRequests,
  resultRequests,
  schoolRequests
} from "../bal/requests";

import { AsyncCrudGenerator } from "./crudGenerators/asyncCrud.generator";
import AuthService from "./auth.service";
import { wait } from "../utils";

export type Services = {
  [ServiceTypes.App]: {
    isLoading: boolean;
  };
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
  socket$?: ISocket$;
  services: Services;
  constructor() {
    this.services = {
      [ServiceTypes.App]: {
        isLoading: true
      }
    } as Services;
  }

  init = () => {
    this._initWebSocket();
    this._initServices();
    this._initDataAccess();
    this._initAuthService(this.services.dataAccess.user);
    this._initChatService(this.socket$ as ISocket$);
    console.log("All Services Loads", this.services);
  };

  loadCollections = async () => {
    const collectionsStoreInitPromises = Object.values(
      this.services.dataAccess
    ).map((collection) => collection.init());
    await Promise.all(collectionsStoreInitPromises);
    this._isLoading(false);
    console.log("All Data Loaded");
  };

  private _isLoading = (isLoading: boolean) => {
    this.services[ServiceTypes.App].isLoading = isLoading;
    this.services.stateManager.updateState();
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
    // ** This is where I could just swap out the local storage version
    this.services[ServiceTypes.DataAccess] = createDataAccessServices(
      this.services.store as Store
    );
  };

  private _initAuthService = (userDataAccess: any) => {
    const currentUserId = userDataAccess.get(
      localStorage.getItem("currentUserId") || ""
    );
    this.services[ServiceTypes.AuthService] = new AuthService(
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

  const SchoolService = new AsyncCrudGenerator<
    School,
    CreateSchoolPayload,
    DeleteSchoolPayload,
    UpdateSchoolPayload,
    GetSchoolPayload
  >(Collections.School, schoolRequests, store);

  return {
    [Collections.Program]: ProgramService,
    [Collections.User]: UserService,
    [Collections.Result]: ResultService,
    [Collections.School]: SchoolService
  };
};
