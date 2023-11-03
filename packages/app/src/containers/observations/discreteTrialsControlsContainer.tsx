import React from "react";
import { ObservationMetaTestIds, Target } from "@parsimony/types";
import { Discrete_Trial_ID } from "../../domains/state/actions/appState/observations.actions";
import { Button } from "../../components";
import { Container } from "typedi";
import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";

export const DiscreteTrialsControlsContainer = () => {
  const API = Container.get(UIApi);
  const { program } = API.actions.observations.state();
  const { currentStep } =
    API.actions.observations.getTargetState(Discrete_Trial_ID);

  return (
    <div className="group-controls">
      <h3>Trial: {currentStep}</h3>
      <div className="group-contols-buttons">
        {currentStep > 1 && (
          <Button
            name="Back"
            action={() => {
              API.actions.observations.decrementStep(Discrete_Trial_ID);
              program?.targets?.forEach((target) => {
                API.actions.observations.decrementStep(target?.id || "");
              });
            }}
            metaTestId={ObservationMetaTestIds.revertRuleBtn}
          />
        )}
        <Button
          name="Next Step"
          action={() => {
            API.actions.observations.incrementStep(Discrete_Trial_ID);
            program?.targets?.forEach((target) => {
              API.actions.observations.incrementStep(target?.id || "");
            });
          }}
          metaTestId={ObservationMetaTestIds.nextRuleBtn}
        />
        <Button
          name="Close"
          action={() =>
            API.actions.observations.updateTargetState(Discrete_Trial_ID, {
              active: false
            })
          }
          metaTestId={ObservationMetaTestIds.closeGroupedRuleBtn}
        />
      </div>
    </div>
  );
};
