import React from "react";
import { Container } from "typedi";
import UIApi from "../domains/uiApi/uiApi.Service";

import { compileStyles } from "../utils";
import { Button, Icon } from "../components";
import { BehaviorTracker } from "@parsimony/types";
import { TimerSubmitDialogMessage } from "./behaviorTracker/dialogMessages/timer.dialog.message";

export const TimerContainer = () => {
  const API = Container.get(UIApi);
  const { timerActive, activeProgram } =
    API.system.getAppState("behaviorTracker");

  return (
    <div
      className={compileStyles({
        timerContainer: true,
        active: timerActive
      })}
    >
      <h1>{API.actions.timer.getFormattedTimerTime()}</h1>
      <div className="flex-row">
        <Button
          metaTestId={BehaviorTracker.startTimer}
          name="Start Timer"
          action={API.actions.timer.start}
          icon={<Icon.Play />}
        />
        <Button
          metaTestId={BehaviorTracker.stopTime}
          name="Stop Time"
          action={() =>
            activeProgram &&
            API.actions.timer.complete(
              activeProgram,
              <TimerSubmitDialogMessage program={activeProgram} />
            )
          }
          icon={<Icon.BehaviorIntervalStop />}
        />
        <Button
          metaTestId={BehaviorTracker.stopTime}
          name="Stop Time"
          action={API.actions.timer.pause}
          icon={<Icon.Pause />}
        />
      </div>
    </div>
  );
};
