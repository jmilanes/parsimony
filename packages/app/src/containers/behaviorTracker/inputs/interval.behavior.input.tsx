import React from "react";

import { BehaviorTracker, Domains, Program } from "@parsimony/types";
import { Button, Icon } from "../../../components";
import { Container } from "typedi";
import UIApi from "../../../domains/uiApi/uiApi.Service";
import { initialResultData } from "../../../fixtures";

export const IntervalBehaviorInput = ({ program }: { program: Program }) => {
  const API = Container.get(UIApi);

  // Maybe this can work more like tall -> number of passes till interval stopped
  const submitResult = async (intervalPassed: boolean) => {
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
          intervalPassed
        },
        created_at: date,
        updated_at: date
      }
    });
    API.updateAppState("dialog", { active: false });
  };

  const ContentForDialog = () => {
    return (
      <div>
        <h1>{program.title}</h1>

        <Button
          metaTestId={BehaviorTracker.passInterval}
          name="Passed"
          action={() => submitResult(true)}
        />
        <Button
          metaTestId={BehaviorTracker.failInterval}
          name="Fail"
          action={() => submitResult(false)}
        />
      </div>
    );
  };

  const action = () => {
    if (program.behavior?.alertTime) {
      const intervalId = setInterval(() => {
        API.updateAppState("dialog", {
          active: true,
          content: ContentForDialog
        });
      }, program.behavior?.alertTime);
      API.updateAppState("behaviorTracker", { intervalId });
      // TODO: ALERT INTERVAL
    }
  };

  const endInterval = () => {
    const intervalId = API.getAppState("behaviorTracker").intervalId;
    clearInterval(intervalId);
  };

  return (
    <div
      className="behavior-input-container"
      key={`behavior-input-container-${program.id}`}
    >
      <p>{program.title}</p>
      <Button
        metaTestId={BehaviorTracker.startInterval}
        name="Interval"
        action={action}
        icon={<Icon.BehaviorInterval />}
      />
      <Button
        metaTestId={BehaviorTracker.startInterval}
        name="Interval"
        action={endInterval}
        icon={<Icon.BehaviorIntervalStop />}
      />
    </div>
  );
};
