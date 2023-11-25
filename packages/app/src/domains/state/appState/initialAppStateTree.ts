import { AppState, DrawerContentTypes } from "./appState.types";

export const APP_STATE: AppState = {
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
    clients: {},
    counters: {},
    timers: {},
    intervals: {}
  },
  notifications: { activeNotifications: {} },
  collectionSelector: {},
  forms: {},
  login: {
    view: "login",
    requestedEmail: "",
    tempPassword: "",
    previousPage: ""
  },
  toggles: {
    programForm: false,
    behaviorForm: false,
    collectionForm: false,
    showBehaviorClientSelector: true
  }
};
