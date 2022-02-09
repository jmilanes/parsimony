import { clone, setDataWithPath } from "../utils";

export type IUpdateLocalStatePayload = {
  localState: Record<string, unknown>;
  updateLocalState: (value: unknown) => void;
};

export interface IStateService {
  updateState: any;
}

class StateService implements IStateService {
  updateState: any;
  constructor() {
    this.updateState = () => console.log("No update state function registered");
  }

  registerUpdateState = (updateFn: any) => (this.updateState = updateFn);

  updateLocalState =
    ({ localState, updateLocalState }: IUpdateLocalStatePayload) =>
    (path: string, value: unknown) => {
      const newState = clone(localState);
      setDataWithPath(newState, path, value);
      updateLocalState(newState);
    };
}

export default StateService;
