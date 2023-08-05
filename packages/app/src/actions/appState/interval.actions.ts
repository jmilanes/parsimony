import { Service } from "typedi";
import { Program } from "@parsimony/types";
import { buildCreateBehaviorRequest } from "../../utils";
import CoreApi from "../../domains/coreApi/coreApi.service";

@Service()
export class IntervalActions {
  #api: CoreApi;

  constructor(_api: CoreApi) {
    this.#api = _api;
  }

  #getIntervalState() {
    return this.#api.getAppState("behaviorTracker");
  }

  public closeIntervalDialog = () => {
    this.#api.updateAppState("dialog", { active: false });
  };

  public resetIntervalTracking = () => {
    const { intervalId } = this.#getIntervalState();
    clearInterval(intervalId);
    this.closeIntervalDialog();
    this.#api.updateAppState("behaviorTracker", {
      intervalTotal: 0,
      intervalOccurred: 0,
      activeInterval: undefined
    });
  };

  public startInterval = (program: Program, onInterval: () => void) => {
    if (program.behavior?.alertTime) {
      const intervalId = setInterval(() => {
        onInterval();
      }, program.behavior?.alertTime * 1000);
      this.#api.updateAppState("behaviorTracker", { intervalId });
    }
  };

  public endInterval = (openDialog: () => void) => {
    const { intervalId } = this.#getIntervalState();
    clearInterval(intervalId);
    openDialog();
  };

  public submit = async (program: Program) => {
    const { intervalOccurred, intervalTotal } = this.#getIntervalState();
    const result = Math.round((intervalOccurred / intervalTotal) * 100);
    await this.#api.makeRequest(
      buildCreateBehaviorRequest({ program, result })
    );
    this.resetIntervalTracking();
  };

  public onSuccess = () => {
    const { intervalTotal, intervalOccurred } = this.#getIntervalState();
    this.#api.updateAppState("behaviorTracker", {
      intervalTotal: intervalTotal + 1,
      intervalOccurred: intervalOccurred + 1
    });
    this.closeIntervalDialog();
  };
  public onFail = () => {
    const { intervalTotal } = this.#getIntervalState();
    this.#api.updateAppState("behaviorTracker", {
      intervalTotal: intervalTotal + 1
    });
    this.closeIntervalDialog();
  };
}
