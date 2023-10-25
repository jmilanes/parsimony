import {
  Domains,
  ICompletenessState,
  IResultsState,
  Program,
  User
} from "@parsimony/types";
import { clone } from "../utils";
import Store from "../domains/store/store";
import { Service } from "typedi";
import { useState } from "react";

type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object
    ? Subset<K[attr]>
    : K[attr] extends object | null
    ? Subset<K[attr]> | null
    : K[attr] extends object | null | undefined
    ? Subset<K[attr]> | null | undefined
    : K[attr];
};

// TODO Move to types and clean up so you are not having to use strings everywhere
export enum DrawerContentTypes {
  Chat = "chat",
  CreateChat = "createChat",
  BulkPrograms = "bulkPrograms",
  Nav = "nav",
  CurrentUser = "currentUser",
  ProgramSelector = "programSelector",
  BehaviorViewer = "behaviorViewer"
}

export type DrawerControls = {
  active: boolean;
  width: number | string;
  placement: "left" | "right";
  content: DrawerContentTypes;
};

export type BulkProgram = {
  active: boolean;
  clientId?: string;
  collectionIds: string[];
  programIds: string[];
  subscribers: string[];
  excludedIds: string[];
};

export type Timer = {
  program?: Program;
  active: boolean;
  paused: boolean;
  intervalId?: any;
  time: number;
};

export type Interval = {
  intervalId?: any;
  active: boolean;
  occurred: number;
  total: number;
  program?: Program;
};

export type BehaviorTracker = {
  counters: Record<string, number>;
  timers: Record<string, Timer>;
  intervals: Record<string, Interval>;
  clientId?: string;
  activeInterval: boolean;
  intervalId?: any;
  intervalOccurred: number;
  intervalTotal: number;
};

export type ObservationTarget = {
  active: boolean;
  complete: boolean;
  completeness: ICompletenessState;
  results: IResultsState;
  currentStep: number;
};

export type Observation = {
  stated: boolean;
  currentTrial: number;
  programCompleteness: number;
  dateStarted: Date;
  results: Record<string, unknown>;
  resultsData: Record<string, unknown>;
  isLoaded: boolean;
  program?: Program;
  // TODO Figure out why this cant just be an object
  targetStates: Record<string, ObservationTarget>;
};

export type ProgramViewer = {
  clientId?: string;
};

type DialogActions = { name: string; action: () => void };

export type DialogQueueItem = {
  message?: React.ReactElement;
  title?: string;
  actions?: DialogActions[];
};

export type DialogControls = {
  active: boolean;
  message?: React.ReactElement;
  title?: string;
  actions?: DialogActions[];
  queue: DialogQueueItem[];
};

export type Notification = {
  id: string;
  message?: React.ReactElement | string;
  action?: React.ReactElement | string;
  autoHideDuration?: number;
  onClose?: () => void;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "right" | "center";
  };
};

export type CollectionSelector = {
  selectedId?: string;
  idToUpdate?: string;
};

export type LoginViewTypes = "login" | "requestReset" | "resetPassword";

export type Login = {
  view: LoginViewTypes;
  tempPassword: string;
  requestedEmail: string;
  previousPage: string;
};

export type AppState = {
  drawer: DrawerControls;
  dialog: DialogControls;
  bulkPrograms: BulkProgram;
  programViewer: ProgramViewer;
  behaviorTracker: BehaviorTracker;
  observation: Observation;
  notifications: { activeNotifications: Record<string, Notification> };
  collectionSelector: CollectionSelector;
  forms: Record<string, any>;
  login: Login;
};

const APP_STATE: AppState = {
  dialog: {
    active: false,
    queue: []
  },
  drawer: {
    active: false,
    width: 500,
    placement: "left",
    content: DrawerContentTypes.Chat
  },
  bulkPrograms: {
    active: false,
    collectionIds: [],
    programIds: [],
    subscribers: [],
    excludedIds: []
  },
  observation: {
    dateStarted: new Date(),
    stated: false,
    currentTrial: 0,
    programCompleteness: 0,
    results: {},
    resultsData: {},
    isLoaded: false,
    targetStates: {}
  },
  programViewer: {},
  // Break each behavior into its own domain (interval and program)
  behaviorTracker: {
    counters: {},
    timers: {},
    intervals: {},
    activeInterval: false,
    intervalOccurred: 0,
    intervalTotal: 0
  },
  notifications: { activeNotifications: {} },
  collectionSelector: {},
  forms: {},
  login: {
    view: "login",
    requestedEmail: "",
    tempPassword: "",
    previousPage: ""
  }
};

@Service()
export default class AppStateService {
  store: Store;
  appState: AppState;

  constructor(store: Store) {
    //@ts-ignore
    window.getAppState = this.getAppState;

    this.store = store;
    this.appState = APP_STATE;
  }

  init = () => {
    this.store.getDomain$(Domains.AppState).next(this.appState);
  };

  public getAppState = () => {
    return this.store.getDomainValue(Domains.AppState);
  };

  public getAppStateByKey = <K extends keyof AppState>(
    appStateKey: K
  ): AppState[K] => {
    return this.store.getValueByPath(Domains.AppState, appStateKey);
  };

  public updateAppState = <K extends keyof AppState>(
    appStateKey: K,
    update: Partial<AppState[K]>
  ) => {
    // TODO: Make this better
    const currentControls = clone(this.store.getDomainValue(Domains.AppState));

    currentControls[appStateKey] = {
      ...(currentControls[appStateKey] as Record<string, any>),
      ...update
    };

    this.store.getDomain$(Domains.AppState).next({ ...currentControls });
  };

  public resetAppStateByKey = (appStateKey: keyof AppState) => {
    const currentControls = clone(this.store.getDomainValue(Domains.AppState));
    currentControls[appStateKey] = APP_STATE[appStateKey];
    this.store.getDomain$(Domains.AppState).next({ ...currentControls });
  };
}
