import { Service } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { Domains, Program } from "@parsimony/types";
import { initialResultData } from "../../fixtures";
import { buildCreateBehaviorRequest } from "../../utils";

// MAke Actions pattern better...
@Service()
export class IntervalActions {
  #api: UIApi;

  constructor(_api: UIApi) {
    this.#api = _api;
  }

  #getIntervalState() {
    return this.#api.getAppState("behaviorTracker");
  }

  public closeIntervalDialog = () =>
    this.#api.updateAppState("dialog", { active: false });

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
    const result = intervalOccurred / intervalTotal;
    await this.#api.makeRequest(
      buildCreateBehaviorRequest({ program, result })
    );
    this.#api.actions.interval.resetIntervalTracking();
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
