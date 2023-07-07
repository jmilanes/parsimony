import { Domains } from "@parsimony/types";
import { clone } from "../utils";
import Store from "../domains/store/store";
import { Service } from "typedi";

type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object
    ? Subset<K[attr]>
    : K[attr] extends object | null
    ? Subset<K[attr]> | null
    : K[attr] extends object | null | undefined
    ? Subset<K[attr]> | null | undefined
    : K[attr];
};

export enum DrawerContentTypes {
  Chat = "chat",
  CreateChat = "createChat",
  BulkPrograms = "bulkPrograms",
  Nav = "nav",
  CurrentUser = "currentUser",
  ProgramSelector = "programSelector"
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

export type ProgramViewer = {
  clientId?: string;
};

export type AppState = {
  drawer: DrawerControls;
  bulkPrograms: BulkProgram;
  programViewer: ProgramViewer;
};

export type ControlPayloads = Partial<DrawerControls>;

@Service()
export default class AppStateService {
  store: Store;
  appState: AppState;

  constructor(store: Store) {
    this.store = store;
    this.appState = {
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
      programViewer: {}
    };
  }

  init = () => {
    this.store.getDomain$(Domains.AppState).next(this.appState);
  };

  public updateAppState = <K extends keyof AppState>(
    appStateKey: K,
    update: Partial<AppState[K]>
  ) => {
    const currentControls = clone(this.store.getDomainValue(Domains.AppState));

    currentControls[appStateKey] = {
      ...(currentControls[appStateKey] as Record<string, any>),
      ...update
    };

    this.store.getDomain$(Domains.AppState).next({ ...currentControls });
  };
}
