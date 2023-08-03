import { Service } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { Program } from "@parsimony/types";
import { buildCreateBehaviorRequest, clone, uuid } from "../../utils";

// MAke Actions pattern better...
@Service()
export class TallyActions {
  #api: UIApi;

  constructor(_api: UIApi) {
    this.#api = _api;
  }

  #getCounters() {
    return this.#api.getAppState("behaviorTracker").counters;
  }

  public getCounter = (program: Program) => {
    return this.#getCounters()[program.id];
  };

  public deleteCounter = (program: Program) => {
    const update = clone(this.#getCounters());
    delete update[program.id];
    this.#api.updateAppState("behaviorTracker", { counters: update });
  };

  public increment = (program: Program) => {
    const update = clone(this.#getCounters());
    update[program.id] = update[program.id] ? update[program.id] + 1 : 1;
    this.#api.updateAppState("behaviorTracker", { counters: update });
  };

  public decrement = (program: Program) => {
    const update = clone(this.#getCounters());
    if (update[program.id] > 0) {
      update[program.id] = update[program.id] - 1;
      this.#api.updateAppState("behaviorTracker", { counters: update });
    }
  };

  public submit = async (program: Program, tally: number) => {
    await this.#api.makeRequest(
      buildCreateBehaviorRequest({ program, result: tally })
    );
    this.deleteCounter(program);
  };
}
