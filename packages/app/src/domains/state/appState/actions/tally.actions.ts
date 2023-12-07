import { Service } from "typedi";

import { Program } from "@parsimony/types";
import { buildCreateBehaviorRequest, clone, uuid } from "../../../../utils";
import CoreApi from "../../../accessApis/coreApi/coreApi.service";
import { BehaviorTracker, Counter, Timer } from "../appState.types";

// MAke Actions pattern better...
@Service()
export class TallyActions {
  #api: CoreApi;

  constructor(_api: CoreApi) {
    this.#api = _api;
  }

  public getAppState = () => {
    return this.#api.getAppState("behaviorTracker");
  };

  public updateAppState = (update: Partial<BehaviorTracker>) => {
    this.#api.updateAppState("behaviorTracker", update);
  };

  public updateCounterState(id: string, update: Partial<Counter>) {
    const { counters } = this.getAppState();
    counters[id] = { ...counters[id], ...update };
    this.updateAppState({ counters });
  }

  #getCounters() {
    return this.getAppState().counters;
  }

  public getCounter = (program: Program) => {
    return this.#getCounters()[program.id];
  };

  public init = (program: Program) => {
    this.#createCounter(program);
  };

  resetCounter = (program: Program) => {
    this.updateCounterState(program.id, {
      count: 0,
      notes: "",
      showNoteEditor: false
    });
  };

  public destroyAllCounters = () => {
    this.updateAppState({ counters: {} });
  };

  #createCounter(program: Program) {
    const counters = this.#getCounters();
    counters[program.id] = { count: 0, notes: "", showNoteEditor: false };
    this.updateAppState({ counters });
  }

  public increment = (program: Program) => {
    const prev = this.getCounter(program);
    this.updateCounterState(program.id, {
      count: prev.count + 1
    });
  };

  //com

  public decrement = (program: Program) => {
    const prev = this.getCounter(program);
    if (prev.count > 0) {
      this.updateCounterState(program.id, { count: prev.count - 1 });
    }
  };

  public addNotes = (program: Program, notes: string) => {
    this.updateCounterState(program.id, { notes });
  };

  public showNoteEditor = (program: Program) => {
    this.updateCounterState(program.id, { showNoteEditor: true });
  };

  public hideNoteEditor = (program: Program) => {
    this.updateCounterState(program.id, { showNoteEditor: false });
  };

  public submit = async (program: Program, tally: number) => {
    const { count, notes } = this.getCounter(program);
    await this.#api.makeRequest(
      buildCreateBehaviorRequest({ program, result: count, notes })
    );
    this.resetCounter(program);
  };
}
