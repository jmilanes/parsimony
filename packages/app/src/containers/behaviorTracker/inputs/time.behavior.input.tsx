import React from "react";

import { BehaviorTracker, Domains, Program } from "@parsimony/types";
import { Button, Icon } from "../../../components";
import { Container } from "typedi";
import UIApi from "../../../domains/uiApi/uiApi.Service";
import { TimerSubmitDialogMessage } from "../dialogMessages/timer.dialog.message";

export const TimeBehaviorInput = ({ program }: { program: Program }) => {
  const API = Container.get(UIApi);
  return (
    <div className="behavior-input-container" key={program.id}>
      <div className="flex-row">
        <Button
          metaTestId={BehaviorTracker.startTimer}
          name="Start Timer"
          action={() => {
            API.system.updateAppState("behaviorTracker", {
              activeProgram: program
            });
            API.actions.timer.start();
          }}
          icon={<Icon.BehaviorTime />}
        />
        <Button
          metaTestId={BehaviorTracker.stopTime}
          name="Stop Duration"
          action={() =>
            API.actions.timer.complete(
              program,
              <TimerSubmitDialogMessage program={program} />
            )
          }
          icon={<Icon.BehaviorIntervalStop />}
        />
        <Button
          metaTestId={BehaviorTracker.submitZero}
          name="Zero"
          action={() => API.actions.timer.submit(program)}
          icon={<Icon.BehaviorTimeZero />}
        />
        <p>{program.title}</p>
      </div>
    </div>
  );
};
