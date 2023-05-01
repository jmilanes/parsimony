import { Domains } from "@parsimony/types";
import { clone } from "../utils";
import Store from "./store";
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
  CreateChat = "createChat"
}

export type DrawerControls = {
  active: boolean;
  width: number | string;
  placement: "left" | "right";
  content: DrawerContentTypes;
};

export type AppControls = {
  drawer: DrawerControls;
};

type ControlPayloads = Partial<DrawerControls>;

@Service()
export default class AppControlsService {
  store: Store;
  defaultControls: AppControls;

  constructor(store: Store) {
    this.store = store;
    this.defaultControls = {
      drawer: {
        active: false,
        width: 500,
        placement: "left",
        content: DrawerContentTypes.Chat
      }
    };
  }

  init = () => {
    this.store.getDomain$(Domains.AppControls).next(this.defaultControls);
  };

  updateControls = (control: keyof AppControls, update: ControlPayloads) => {
    const currentControls = clone(
      this.store.getDomainValue(Domains.AppControls)
    );

    currentControls[control] = {
      ...(currentControls[control] as Record<string, any>),
      ...update
    };

    this.store.getDomain$(Domains.AppControls).next({ ...currentControls });
  };
}
