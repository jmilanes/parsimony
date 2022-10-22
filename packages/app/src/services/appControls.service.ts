import { Collections } from "@parsimony/types/src";
import { clone } from "../utils";
import Store from "./store";

type Subset<K> = {
  [attr in keyof K]?: K[attr] extends object
    ? Subset<K[attr]>
    : K[attr] extends object | null
    ? Subset<K[attr]> | null
    : K[attr] extends object | null | undefined
    ? Subset<K[attr]> | null | undefined
    : K[attr];
};

export type AppControls = {
  drawer: {
    active: boolean;
    width: number;
    placement: "left" | "right";
  };
};
export default class AppControlsService {
  store: Store;
  defaultControls: AppControls;
  constructor(store: Store) {
    this.store = store;
    this.defaultControls = {
      drawer: {
        active: false,
        width: 500,
        placement: "left"
      }
    };
  }

  init = () => {
    this.store
      .getCollection$(Collections.AppControls)
      .next(this.defaultControls);
  };

  updateControls = (update: Subset<AppControls>) => {
    const currentControls = clone(
      this.store.getCollectionValue(Collections.AppControls)
    );

    this.store
      .getCollection$(Collections.AppControls)
      .next({ ...currentControls, ...update });
  };
}
