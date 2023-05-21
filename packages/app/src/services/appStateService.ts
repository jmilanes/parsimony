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
  BulkPrograms = "bulkPrograms"
}

export type DrawerControls = {
  active: boolean;
  width: number | string;
  placement: "left" | "right";
  content: DrawerContentTypes;
};

export type AppState = {
  drawer: DrawerControls;
  bulkPrograms: {
    clientId?: string;
    collectionIds: string[];
    programIds: string[];
  };
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
        collectionIds: [],
        programIds: []
      }
    };
  }

  init = () => {
    this.store.getDomain$(Domains.AppState).next(this.appState);
  };

  public updateControls = (
    control: keyof AppState,
    update: ControlPayloads
  ) => {
    const currentControls = clone(this.store.getDomainValue(Domains.AppState));

    currentControls[control] = {
      ...(currentControls[control] as Record<string, any>),
      ...update
    };

    this.store.getDomain$(Domains.AppState).next({ ...currentControls });
  };
}
