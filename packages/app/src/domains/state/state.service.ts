import Store from "./store/store";
import { Service } from "typedi";

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
}

export default StateService;
