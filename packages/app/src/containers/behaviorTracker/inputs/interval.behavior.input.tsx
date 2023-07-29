import React, { useState } from "react";

import { BehaviorTracker, Domains, Program } from "@parsimony/types";
import { Button, Icon } from "../../../components";
import { Container } from "typedi";
import UIApi from "../../../domains/uiApi/uiApi.Service";
import { initialResultData } from "../../../fixtures";

export const IntervalBehaviorInput = ({ program }: { program: Program }) => {
  const API = Container.get(UIApi);

  const closeInterval = () => API.updateAppState("dialog", { active: false });
  const getBehaviorTrackerState = () => API.getAppState("behaviorTracker");
  const user = API.getItem(Domains.User, program.clientId || "");

  const resetInterval = () => {
    closeInterval();
    API.updateAppState("behaviorTracker", {
      intervalTotal: 0,
      intervalOccurred: 0
    });
  };

  // Maybe this can work more like tall -> number of passes till interval stopped
  const submitResult = async () => {
    const { intervalOccurred, intervalTotal } = getBehaviorTrackerState();
    const date = new Date();
    await API.makeRequest({
      domain: Domains.Result,
      requestType: "create",
      payload: {
        ...initialResultData,
        id: undefined,
        clientId: program?.clientId,
        programId: program?.id,
        behaviorData: {
          type: program.behavior?.type,
          intervalPassed: intervalOccurred / intervalTotal
        },
        created_at: date,
        updated_at: date
      }
    });
    resetInterval();
  };

  const onSuccess = () => {
    const { intervalTotal, intervalOccurred } = getBehaviorTrackerState();
    API.updateAppState("behaviorTracker", {
      intervalTotal: intervalTotal + 1,
      intervalOccurred: intervalOccurred + 1
    });
    closeInterval();
  };
  const onFail = () => {
    const { intervalTotal } = getBehaviorTrackerState();
    API.updateAppState("behaviorTracker", { intervalTotal: intervalTotal + 1 });
    closeInterval();
  };

  const openIntervalDialog = () => {
    API.updateAppState("dialog", {
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
          action: onSuccess
        },
        {
          name: "Did Not Occur",
          action: onFail
        }
      ]
    });
  };

  const startInterval = () => {
    if (program.behavior?.alertTime) {
      const intervalId = setInterval(() => {
        openIntervalDialog();
      }, program.behavior?.alertTime * 1000);
      API.updateAppState("behaviorTracker", { intervalId });
    }
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

  const endInterval = () => {
    const intervalId = getBehaviorTrackerState().intervalId;
    clearInterval(intervalId);
    API.updateAppState("dialog", {
      active: true,
      title: program.title as string,
      message: submitMessage(),
      actions: [
        {
          name: "Continue",
          action: startInterval
        },
        {
          name: "Cancel",
          action: resetInterval
        },
        { name: "Submit", action: submitResult }
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
          action={startInterval}
          icon={<Icon.BehaviorInterval />}
        />
        <Button
          metaTestId={BehaviorTracker.startInterval}
          name="Interval"
          action={endInterval}
          icon={<Icon.BehaviorIntervalStop />}
        />
        <p>{program.title}</p>
      </div>
    </div>
  );
};
