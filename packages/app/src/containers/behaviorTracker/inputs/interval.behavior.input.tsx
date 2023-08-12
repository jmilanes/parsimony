import React from "react";

import { BehaviorTracker, Domains, Program } from "@parsimony/types";
import { Button, Icon } from "../../../components";
import { Container } from "typedi";
import UIApi from "../../../domains/uiApi/uiApi.Service";

export const IntervalBehaviorInput = ({ program }: { program: Program }) => {
  const API = Container.get(UIApi);

  const getBehaviorTrackerState = () =>
    API.system.getAppState("behaviorTracker");
  const user = API.system.getItem(Domains.User, program.clientId || "");

  const openIntervalDialog = () => {
    API.system.updateAppState("dialog", {
      active: true,
      title: program.title as string,
      message: (
        <div>
          <p>Did {user.firstName}:</p> <p>{program.description}</p>
        </div>
      ),
      actions: [
        {
          name: "Occurred",
          action: API.actions.interval.onFail
        },
        {
          name: "Did Not Occur",
          action: API.actions.interval.onSuccess
        }
      ]
    });
  };

  const submitMessage = () => {
    const { intervalOccurred, intervalTotal } = getBehaviorTrackerState();
    const percent = (intervalOccurred / intervalTotal) * 100;
    return (
      <div>
        <p>{`Results ${Math.round(percent) || 0}`}%</p>
        <p>{`Occurred ${intervalOccurred} of ${intervalTotal} times`}</p>
      </div>
    );
  };

  const openEndIntervalDialog = () => {
    API.system.updateAppState("dialog", {
      active: true,
      title: program.title as string,
      message: submitMessage(),
      actions: [
        {
          name: "Continue",
          action: () =>
            API.actions.interval.startInterval(program, openIntervalDialog)
        },
        {
          name: "Cancel",
          action: API.actions.interval.resetIntervalTracking
        },
        { name: "Submit", action: () => API.actions.interval.submit(program) }
      ]
    });
  };

  return (
    <div
      className="behavior-input-container"
      key={`behavior-input-container-${program.id}`}
    >
      <div className="flex-row">
        <Button
          metaTestId={BehaviorTracker.startInterval}
          name="Interval"
          action={() =>
            API.actions.interval.startInterval(program, openIntervalDialog)
          }
          icon={<Icon.BehaviorInterval />}
        />
        <Button
          metaTestId={BehaviorTracker.startInterval}
          name="Interval"
          action={() => API.actions.interval.endInterval(openEndIntervalDialog)}
          icon={<Icon.BehaviorIntervalStop />}
        />
        <p>{program.title}</p>
      </div>
    </div>
  );
};
