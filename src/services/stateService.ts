import { clone, setDataWithPath } from "../utils";

export type IUpdateLocalStatePayload = {
  localState: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateLocalState: (value: any) => void;
};

export interface IStateService {
  updateState: () => void;
}

class StateService implements IStateService {
  updateState: () => void;
  constructor() {
    this.updateState = () => console.log("No update state function registered");
  }

  registerUpdateState = (updateFn: () => void) => (this.updateState = updateFn);

  updateLocalState =
    ({ localState, updateLocalState }: IUpdateLocalStatePayload) =>
    (path: string, value: unknown) => {
      const newState = clone(localState);
      setDataWithPath(newState, path, value);
      updateLocalState(newState);
    };
}

export default StateService;
