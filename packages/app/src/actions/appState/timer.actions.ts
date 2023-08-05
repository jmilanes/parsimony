import { Service } from "typedi";

import React from "react";

import { Program } from "@parsimony/types";
import { intervalToDuration } from "date-fns";
import { prependZero, buildCreateBehaviorRequest } from "../../utils";
import CoreApi from "../../domains/coreApi/coreApi.service";

@Service()
export class TimerActions {
  #api: CoreApi;

  constructor(_api: CoreApi) {
    this.#api = _api;
  }

  public start = () => {
    const { timerActive, timerPaused } =
      this.#api.getAppState("behaviorTracker");
    if (!timerActive || timerPaused) {
      this.#api.updateAppState("behaviorTracker", {
        timerActive: true
      });
      const intervalId = setInterval(() => {
        this.#api.updateAppState("dialog", { active: false });
        const { time } = this.#api.getAppState("behaviorTracker");
        this.#api.updateAppState("behaviorTracker", { time: time + 1000 });
      }, 1000);

      this.#api.updateAppState("behaviorTracker", { intervalId });
    }
  };

  public pause = () => {
    const { intervalId } = this.#api.getAppState("behaviorTracker");
    clearInterval(intervalId);
    this.#api.updateAppState("behaviorTracker", {
      timerPaused: true
    });
  };

  public cancel = () => {
    const { intervalId } = this.#api.getAppState("behaviorTracker");
    clearInterval(intervalId);
    this.#api.updateAppState("dialog", { active: false });
    this.#api.updateAppState("behaviorTracker", {
      time: 0,
      timerPaused: false,
      timerActive: false
    });
  };

  public complete = (program: Program, message: React.ReactElement) => {
    const intervalId = this.#api.getAppState("behaviorTracker").intervalId;
    this.#api.updateAppState("behaviorTracker", { timerPaused: true });
    clearInterval(intervalId);
    this.#api.updateAppState("dialog", {
      active: true,
      title: program.title as string,
      message: message,
      actions: [
        {
          name: "Continue",
          action: this.start
        },
        {
          name: "Cancel",
          action: this.cancel
        },
        {
          name: "Submit",
          action: () => this.submit(program)
        }
      ]
    });
  };

  public getFormattedTimerTime = () => {
    const { time } = this.#api.getAppState("behaviorTracker");

    const { hours, minutes, seconds } = intervalToDuration({
      start: 0,
      end: time
    });
    return `${prependZero(hours)} : ${prependZero(minutes)} : ${prependZero(
      seconds
    )}`;
  };

  // This can be generic to all three once the behavior data is aligned
  public submit = async (program: Program) => {
    const { time } = this.#api.getAppState("behaviorTracker");
    await this.#api.makeRequest(
      buildCreateBehaviorRequest({ program, result: time })
    );
    this.cancel();
  };
}
