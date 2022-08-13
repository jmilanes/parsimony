import { Collections } from "@parsimony/types/src";
import { clone, setDataWithPath } from "../utils";
import { Store } from "./store";

export type IUpdateLocalStatePayload = {
  localState: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateLocalState: (value: any) => void;
};

export interface IStateService {
  updateState: () => void;
}

class StateService implements IStateService {
  store: Store;
  updateState: () => void;
  constructor(store: Store) {
    this.store = store;
    this.updateState = () => console.log("No update state function registered");
  }

  registerUpdateState = (updateFn: () => void) => {
    this.updateState = updateFn;
    const collections = [Collections.User, Collections.Program];
    collections.forEach((collection) =>
      this.store.subscribeToStoreCollection(collection, this.updateState)
    );
  };

  updateLocalState =
    ({ localState, updateLocalState }: IUpdateLocalStatePayload) =>
    (path: string, value: unknown) => {
      const newState = clone(localState);
      setDataWithPath(newState, path, value);
      updateLocalState(newState);
    };
}

export default StateService;
