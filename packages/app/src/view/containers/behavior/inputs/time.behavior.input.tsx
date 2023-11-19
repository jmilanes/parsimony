import React, { useEffect } from "react";

import { BehaviorTracker, Domains, Program } from "@parsimony/types";
import { Button, Icon } from "../../../components";
import { Container } from "typedi";
import UIApi from "../../../../domains/accessApis/uiApi/uiApi.Service";
import { TimerSubmitDialogMessage } from "../dialogMessages/timer.dialog.message";

export const TimeBehaviorInput = ({ program }: { program: Program }) => {
  const API = Container.get(UIApi);
  useEffect(() => {
    API.actions.timer.init(program);
  }, []);

  if (!API.actions.timer.programIsInitialized(program)) {
    return null;
  }
  return (
    <div className="behavior-input-container" key={program.id}>
      <div className="flex-row">
        <Button
          metaTestId={BehaviorTracker.startTimer}
          name="Start Timer"
          onClick={() => API.actions.timer.start(program)}
          icon={<Icon.BehaviorTime />}
        />
        <Button
          metaTestId={BehaviorTracker.stopTime}
          name="Stop Duration"
          onClick={() =>
            API.actions.timer.complete(
              program,
              <TimerSubmitDialogMessage program={program} />
            )
          }
          icon={<Icon.BehaviorIntervalStop />}
        />
        <p>{program.title}</p>
      </div>
      <p>{API.actions.timer.getFormattedTimerTime(program)}</p>
    </div>
  );
};
