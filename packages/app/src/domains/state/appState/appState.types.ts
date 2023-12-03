import { ICompletenessState, IResultsState, Program } from "@parsimony/types";

// TODO These should live closer to the domain "action" or "service" where ever the name winds up
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

export type ClientId = string;

export type BehaviorClient = {
  active: boolean;
  createdBehaviorIds: string[];
  id: ClientId;
};

export type BehaviorClients = Record<ClientId, BehaviorClient>;

export type BehaviorTracker = {
  counters: Record<string, number>;
  timers: Record<string, Timer>;
  intervals: Record<string, Interval>;
  clients: BehaviorClients;
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
  notes: String;
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

export type Toggles = {
  programForm: boolean;
  behaviorForm: boolean;
  collectionForm: boolean;
  showBehaviorClientSelector: boolean;
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
  toggles: Toggles;
  forms: Record<string, any>;
  login: Login;
};
