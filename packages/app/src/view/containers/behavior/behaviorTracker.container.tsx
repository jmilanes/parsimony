import React, { useEffect } from "react";

import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";
import { Button, Header, IOption } from "../../components";
import { ClientSelector } from "../shared/clientSelector";
import { BehaviorMetaTestIds } from "@parsimony/types";
import { BehaviorClientView } from "./behaviorClientView.container";

export const BehaviorTrackerContainer = () => {
  const API = Container.get(UIApi);

  const selectedClients = API.actions.behaviorTracker.currentValues();

  const showClientSelector = () => {
    API.actions.toggle.setTrue("showBehaviorClientSelector");
  };

  useEffect(() => {
    if (selectedClients.length === 0) {
      showClientSelector();
    }
  }, [selectedClients.length]);

  const showSelector = API.actions.toggle.getToggleActiveState(
    "showBehaviorClientSelector"
  );

  const resetAll = () => {
    // This needs to be another client
    API.actions.timer.destroyAllTimers();
    API.actions.interval.destroyIntervals();
    API.actions.tally.destroyAllCounters();
    API.actions.behaviorTracker.destroyClients();
    showClientSelector();
  };

  const onChange = (options: IOption[]) => {
    options.forEach((opt) => {
      const id = opt.value as string;
      API.actions.behaviorTracker.addClient(id);
    });
    const selectedClients = API.actions.behaviorTracker.clientCount();
    if (selectedClients > 0) {
      API.actions.toggle.setFalse("showBehaviorClientSelector");
    }
  };

  return (
    <div>
      <div className="behaviorHeader">
        <Header text="Behaviors" size="md" />
        <div className="flex-row">
          <Button
            name="Reset All"
            onClick={resetAll}
            metaTestId={BehaviorMetaTestIds.restAll}
          />
          <Button
            name="Add Client"
            onClick={showClientSelector}
            metaTestId={BehaviorMetaTestIds.addClient}
          />
        </div>
      </div>
      {showSelector && (
        <ClientSelector
          onChange={onChange}
          multiSelect={true}
          selected={selectedClients.map((x) => x.id)}
        />
      )}

      {selectedClients.map((selectedClient) => (
        <BehaviorClientView client={selectedClient} />
      ))}
    </div>
  );
};
