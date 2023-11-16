import { Service } from "typedi";

import React from "react";

import { Program } from "@parsimony/types";
import { intervalToDuration } from "date-fns";
import { prependZero, buildCreateBehaviorRequest } from "../../../../utils";
import CoreApi from "../../../accessApis/coreApi/coreApi.service";
import { BehaviorTracker, Timer } from "../appState.types";
import { id } from "date-fns/locale";

const initialTimerState: Timer = {
  active: false,
  paused: false,
  time: 0
};

@Service()
export class TimerActions {
  #api: CoreApi;

  constructor(_api: CoreApi) {
    this.#api = _api;
  }

  public init = (program: Program) => {
    this.#createTimer(program);
  };

  public programIsInitialized = (program: Program) => {
    return this.getAppState().timers[program.id];
  };

  public getAppState = () => {
    return this.#api.getAppState("behaviorTracker");
  };

  public updateAppState = (update: Partial<BehaviorTracker>) => {
    this.#api.updateAppState("behaviorTracker", update);
  };

  #createTimer(program: Program) {
    const { timers } = this.getAppState();
    timers[program.id] = { ...initialTimerState, program };
    this.updateAppState({ timers });
  }

  public getTimerState(id: string) {
    const { timers } = this.getAppState();
    return timers[id];
  }

  public updateTimeState(id: string, update: Partial<Timer>) {
    const { timers } = this.getAppState();
    timers[id] = { ...timers[id], ...update };
    this.updateAppState({ timers });
  }

  public start = ({ id }: Program) => {
    const { active, paused } = this.getTimerState(id);
    if (!active || paused) {
      this.#api.Dialog.close();
      const intervalId = setInterval(() => {
        const { time } = this.getTimerState(id);
        this.updateTimeState(id, { time: time + 1000 });
      }, 1000);

      this.updateTimeState(id, { intervalId });
    }
  };

  public pause = ({ id }: Program) => {
    this.stopIntervalById(id);
    this.updateTimeState(id, {
      paused: true
    });
  };

  public cancel = ({ id }: Program | { id: string }) => {
    this.stopIntervalById(id);
    this.#api.Dialog.close();
    this.updateTimeState(id, {
      time: 0,
      paused: false,
      active: false
    });
  };

  public stopIntervalById(id: string) {
    const { intervalId } = this.getTimerState(id);
    clearInterval(intervalId);
  }

  public cancelAllTimers = () => {
    const { timers } = this.getAppState();
    Object.keys(timers).forEach((id) => this.cancel({ id }));
  };

  public complete = (program: Program, message: React.ReactElement) => {
    this.updateTimeState(program.id, { paused: true });
    this.stopIntervalById(program.id);
    this.#api.Dialog.push({
      title: program.title as string,
      message: message,
      actions: [
        {
          name: "Continue",
          action: () => this.start(program)
        },
        {
          name: "Cancel",
          action: () => this.cancel(program)
        },
        {
          name: "Submit",
          action: () => this.submit(program)
        }
      ]
    });
  };

  public getFormattedTimerTime = ({ id }: Program) => {
    const { time } = this.getTimerState(id);
    debugger;
    return this.formatTime(time);
  };

  public formatTime = (time: number) => {
    const { hours, minutes, seconds } = intervalToDuration({
      start: 0,
      end: time
    });
    return `${prependZero(hours)}:${prependZero(minutes)}:${prependZero(
      seconds
    )}`;
  };

  public resolveFormattedTIme = (formattedTime: string) => {
    const [h, m, s] = formattedTime.split(":");
    return parseInt(h) * 3600000 + parseInt(m) * 60000 + parseInt(s) * 1000;
  };

  // This can be generic to all three once the behavior data is aligned
  public submit = async (program: Program) => {
    const { time } = this.getTimerState(program.id);
    await this.#api.makeRequest(
      buildCreateBehaviorRequest({ program, result: time })
    );
    this.cancel(program);
  };
}
