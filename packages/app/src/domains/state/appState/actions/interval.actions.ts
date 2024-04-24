import { Service } from "typedi";
import { IntervalBehaviorType, Program } from "@parsimony/types";
import { buildCreateBehaviorRequest } from "../../../../utils";
import CoreApi from "../../../accessApis/coreApi/coreApi.service";
import { BehaviorTracker, Interval } from "../appState.types";

const initialIntervalState: Interval = {
  active: false,
  occurred: 0,
  total: 0,
  notes: "",
  showNoteEditor: false
};

@Service()
export class IntervalActions {
  #api: CoreApi;

  constructor(_api: CoreApi) {
    this.#api = _api;
  }

  public init = (program: Program) => {
    this.#createIntervalState(program);
  };

  public programIsInitialized = (program: Program) => {
    return this.getAppState().intervals[program.id];
  };

  getAppState() {
    return this.#api.getAppState("behaviorTracker");
  }

  public updateAppState = (update: Partial<BehaviorTracker>) => {
    this.#api.updateAppState("behaviorTracker", update);
  };

  #createIntervalState(program: Program) {
    const { intervals } = this.getAppState();
    intervals[program.id] = { ...initialIntervalState, program };
    this.updateAppState({ intervals });
  }

  // TODO: Need to align all the patterns of the actions (repository) especally behvaios
  getIntervalState(id: string) {
    const { intervals } = this.getAppState();
    return intervals[id];
  }

  #updateIntervalState(id: string, update: Partial<Interval>) {
    const { intervals } = this.getAppState();
    intervals[id] = { ...intervals[id], ...update };
    this.updateAppState({ intervals });
  }

  public closeIntervalDialog = () => {
    this.#api.Dialog.close();
  };

  public resetIntervalTracking = ({ id }: IntervalBehaviorType) => {
    const { intervalId } = this.getIntervalState(id);
    clearInterval(intervalId);
    this.closeIntervalDialog();
    this.#updateIntervalState(id, {
      total: 0,
      occurred: 0,
      active: false,
      intervalId: undefined,
      notes: "",
      showNoteEditor: false
    });
  };

  public startInterval = (
    program: IntervalBehaviorType,
    onInterval: () => void
  ) => {
    if (program?.alertTime) {
      const intervalId = setInterval(() => {
        onInterval();
      }, program?.alertTime * 1000);
      this.#updateIntervalState(program.id, { intervalId });
    }
  };

  public endInterval = ({ id }: Program, openDialog: () => void) => {
    const { intervalId } = this.getIntervalState(id);
    clearInterval(intervalId);
    openDialog();
  };

  public submit = async (program: IntervalBehaviorType) => {
    const { occurred, total, notes } = this.getIntervalState(program.id);
    const result = Math.round((occurred / total) * 100);
    await this.#api.Requests.result.create(
      buildCreateBehaviorRequest({ program, result, notes })
    );
    this.resetIntervalTracking(program);
  };

  //TODO Figure this out cause you can have n dialogs per ID
  public cancelAllIntervals = () => {
    const { intervals } = this.getAppState();
    Object.keys(intervals).forEach((id) =>
      this.resetIntervalTracking({ id } as IntervalBehaviorType)
    );
    this.#api.Dialog.clear();
  };

  public destroyIntervals = () => {
    this.cancelAllIntervals();
    this.updateAppState({ intervals: {} });
  };

  public onSuccess = ({ id }: Program) => {
    const { total, occurred } = this.getIntervalState(id);
    this.#updateIntervalState(id, {
      total: total + 1,
      occurred: occurred + 1
    });
    this.closeIntervalDialog();
  };
  public onFail = ({ id }: Program) => {
    const { total } = this.getIntervalState(id);
    this.#updateIntervalState(id, {
      total: total + 1
    });
    this.closeIntervalDialog();
  };

  public addNotes = ({ id }: Program, notes: string) => {
    const update = this.getIntervalState(id);
    update.notes = notes;
    this.#updateIntervalState(id, update);
  };

  public showNoteEditor = ({ id }: Program) => {
    const update = this.getIntervalState(id);
    update.showNoteEditor = true;
    this.#updateIntervalState(id, update);
  };

  public hideNoteEditor = ({ id }: Program) => {
    const update = this.getIntervalState(id);
    update.showNoteEditor = false;
    this.#updateIntervalState(id, update);
  };
}
