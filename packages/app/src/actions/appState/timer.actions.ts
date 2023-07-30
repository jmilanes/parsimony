import { Container, Service } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import React from "react";

import { Domains, Program, User } from "@parsimony/types";
import { intervalToDuration } from "date-fns";
import { prependZero } from "../../utils";
import { initialResultData } from "../../fixtures";

// MAke Actions pattern better...
@Service()
export class TimerActions {
  #api: UIApi;

  constructor(_api: UIApi) {
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
          action: this.#api.actions.timer.start
        },
        {
          name: "Cancel",
          action: this.#api.actions.timer.cancel
        },
        {
          name: "Submit",
          action: () => this.#api.actions.timer.submit(program)
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
    const date = new Date();
    // TODO Make generic with other behaviors
    await this.#api.makeRequest({
      domain: Domains.Result,
      requestType: "create",
      payload: {
        ...initialResultData,
        id: undefined,
        clientId: program?.clientId,
        programId: program?.id,
        behaviorData: {
          type: program.behavior?.type,
          result: time
        },
        created_at: date,
        updated_at: date
      }
    });
    this.#api.actions.timer.cancel();
  };
}
