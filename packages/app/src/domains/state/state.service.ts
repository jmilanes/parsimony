import { clone, setDataWithPath } from "../../utils";
import Store from "./store/store";
import { Service } from "typedi";

export type IUpdateLocalStatePayload = {
  localState: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateLocalState: (value: any) => void;
};

export interface IStateService {
  updateState: () => void;
}

@Service()
class StateService implements IStateService {
  store: Store;
  updateState: () => void;

  constructor(store: Store) {
    this.store = store;
    this.updateState = () => console.log("No update state function registered");
  }

  registerUpdateState = (updateFn: () => void) => {
    this.updateState = updateFn;
    this.store.subscribeToStore(updateFn);
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
