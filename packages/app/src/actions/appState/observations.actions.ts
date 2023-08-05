import { Service } from "typedi";

import CoreApi from "../../domains/coreApi/coreApi.service";

@Service()
export class ObservationActions {
  #api: CoreApi;

  constructor(_api: CoreApi) {
    this.#api = _api;
  }

  public state() {
    return this.#api.getAppState("observation");
  }

  public start() {
    this.#api.updateAppState("observation", {
      currentTrialPercentage: 0,
      currentTrial: 1,
      stated: true
    });
  }

  public reset = () => {
    this.#api.updateAppState("observation", {
      currentTrialPercentage: undefined,
      currentTrial: undefined,
      stated: false
    });
  };

  public updateCurrentTrialPercentage = (percentage: number) => {
    const { currentTrialPercentage, currentTrial } = this.state();
    if (currentTrialPercentage === percentage && percentage !== 100) {
      return;
    }

    if (percentage < 100) {
      this.#api.updateAppState("observation", {
        currentTrialPercentage: percentage
      });
    }

    this.#api.updateAppState("observation", {
      currentTrialPercentage: 0,
      currentTrial: currentTrial + 1
    });
  };

  public isTrialActiveForChain = (trial: number) => {
    const { currentTrial } = this.state();
    return trial <= currentTrial;
  };
}
