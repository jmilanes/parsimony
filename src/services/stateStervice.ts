import { clone, setDataWithPath } from "../utils";

export type IUpdateLocalStatePayload = {
  localState: any;
  updateLocalState: any;
};

class StateService {
  updateState: any;
  constructor() {
    this.updateState = null;
  }

  registerUpdateState = (updateFn: any) => (this.updateState = updateFn);

  updateLocalState = ({
    localState,
    updateLocalState
  }: IUpdateLocalStatePayload) => (path: string, value: any) => {
    const newState = clone(localState);
    setDataWithPath(newState, path, value);
    updateLocalState(newState);
  };
}

export default StateService;
