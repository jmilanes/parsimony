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
  School,
  Collections$,
  CreateEventPayload,
  DeleteEventPayload,
  UpdateEventPayload,
  GetEventPayload,
  Event,
  Document,
  CreateDocumentPayload,
  DeleteDocumentPayload,
  UpdateDocumentPayload,
  GetDocumentPayload,
  CreateFilePayload,
  DeleteFilePayload,
  UpdateFilePayload,
  GetAllProgramsByRelationshipPayload,
  GetAllFilesByRelationshipPayload,
  GetAllUsersByRelationshipPayload,
  GetAllSchoolByRelationshipPayload,
  GetAllDocumentsByRelationshipPayload,
  GetAllEventsByRelationshipPayload
} from "@parsimony/types";
import { Observable } from "rxjs";
import ChatService from "./chat.service";
import FilterService from "./filter.service";
import StateService from "./state.service";
import Store from "./store";

import {
  userRequests,
  programRequests,
  resultRequests,
  schoolRequests,
  documentRequests,
  eventRequests,
  fileRequests
} from "../bal/requests";

import { AsyncCrudGenerator } from "./crudGenerators/asyncCrud.generator";
import AuthService from "./auth.service";
import AppControlsService from "./appControls.service";
import { envIs } from "@parsimony/utilities/src";

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
    //TODO: Current User
    [Collections.User]: any;
    [Collections.Program]: any;
    [Collections.Result]: any;
    [Collections.Event]: any;
    [Collections.Document]: any;
    [Collections.File]: any;
    [Collections$.Thread$]: ChatService;
  };
};

export type ISocket$ = Observable<any>;
export default class AppController {
  socket$?: ISocket$;
  services: Services;
  constructor() {
    this.services = {
      //TODO Move to app controls
      [ServiceTypes.App]: {
        isLoading: true
      }
    } as Services;
  }

  init = () => {
    this._initWebSocket();
    this._initServices();
    this.services[ServiceTypes.AppControls].init();
    this._initDataAccess();
    this.loadCollections();
    console.log("All Services Loads", this.services);
  };

  loadCollections = async () => {
    this.services.dataAccess.thread$.init();
    this._initAuthService();
    this._isLoading(false);
    console.log("All Data Loaded");
  };

  private _isLoading = (isLoading: boolean) => {
    this.services[ServiceTypes.App].isLoading = isLoading;
    this.services.stateManager.updateState();
  };

  private _initWebSocket = () => {
    const SOCKET_URL = envIs("prod")
      ? "wss://api.parsimony.app:8080"
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

  private _initServices = () => {
    this.services[ServiceTypes.Store] = new Store();
    this.services[ServiceTypes.StateManager] = new StateService(
      this.services.store
    );
    this.services[ServiceTypes.AppControls] = new AppControlsService(
      this.services.store
    );
    this.services[ServiceTypes.Filter] = new FilterService(
      this.services.stateManager
    );
  };

  private _initDataAccess = () => {
    // ** This is where I could just swap out the local storage version
    this.services[ServiceTypes.DataAccess] = createDataAccessServices(
      this.services.store as Store,
      this.socket$ as ISocket$
    );
  };

  private _initAuthService = async () => {
    const authService = new AuthService();
    authService.init();
    this.services[ServiceTypes.AuthService] = authService;
  };
}

export const createDataAccessServices = (store: Store, socket$: ISocket$) => {
  const UserService = new AsyncCrudGenerator<
    User,
    CreateUserPayload,
    DeleteUserPayload,
    UpdateUserPayload,
    GetUserPayload,
    GetAllUsersByRelationshipPayload
  >(Collections.User, userRequests, store);

  const ProgramService = new AsyncCrudGenerator<
    Program,
    CreateProgramPayload,
    DeleteProgramPayload,
    UpdateProgramPayload,
    GetProgramPayload,
    GetAllProgramsByRelationshipPayload
  >(Collections.Program, programRequests, store);

  const ResultService = new AsyncCrudGenerator<
    Result,
    CreateResultPayload,
    DeleteResultPayload,
    UpdateResultPayload,
    GetResultPayload,
    GetAllProgramsByRelationshipPayload
  >(Collections.Result, resultRequests, store);

  const SchoolService = new AsyncCrudGenerator<
    School,
    CreateSchoolPayload,
    DeleteSchoolPayload,
    UpdateSchoolPayload,
    GetSchoolPayload,
    GetAllSchoolByRelationshipPayload
  >(Collections.School, schoolRequests, store);

  const DocumentService = new AsyncCrudGenerator<
    Document,
    CreateDocumentPayload,
    DeleteDocumentPayload,
    UpdateDocumentPayload,
    GetDocumentPayload,
    GetAllDocumentsByRelationshipPayload
  >(Collections.Document, documentRequests, store);

  const EventService = new AsyncCrudGenerator<
    Event,
    CreateEventPayload,
    DeleteEventPayload,
    UpdateEventPayload,
    GetEventPayload,
    GetAllEventsByRelationshipPayload
  >(Collections.Event, eventRequests, store);

  const FileService = new AsyncCrudGenerator<
    Event,
    CreateFilePayload,
    DeleteFilePayload,
    UpdateFilePayload,
    GetEventPayload,
    GetAllFilesByRelationshipPayload
  >(Collections.File, fileRequests, store);

  return {
    [Collections.Program]: ProgramService,
    [Collections.User]: UserService,
    [Collections.Result]: ResultService,
    [Collections.School]: SchoolService,
    [Collections.Document]: DocumentService,
    [Collections.Event]: EventService,
    [Collections.File]: FileService,
    [Collections$.Thread$]: new ChatService(socket$, store)
  };
};
