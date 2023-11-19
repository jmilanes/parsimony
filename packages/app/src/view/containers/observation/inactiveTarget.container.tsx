import React from "react";
import { ObservationMetaTestIds, Target } from "@parsimony/types";
import { Discrete_Trial_ID } from "../../../domains/state/appState/actions/observations.actions";
import { compileStyles } from "../../../utils";
import { Button, Icon } from "../../components";
import { Container as DI } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

export const InactiveTarget = ({
  target,
  index
}: {
  target: Target;
  index: number;
}) => {
  const API = DI.get(UIApi);

  const isDiscreteTrial = API.actions.observations.isDiscreteTrial();
  const taskAnalysis = API.actions.observations.isTaskAnalysis();
  const id = isDiscreteTrial ? Discrete_Trial_ID : target.id || "";

  const { complete } = API.actions.observations.getTargetState(id);

  const disabled = !API.actions.observations.isTrialActiveForChain(id);

  const classes = isDiscreteTrial
    ? undefined
    : compileStyles({
        observeTarget: true,
        complete
      });
  return (
    <div className={classes}>
      <h3>{target.title}</h3>
      {taskAnalysis && (
        <Button
          name="Observe"
          // SPOT TO ADD CHAIN BLOCK
          disabled={disabled}
          onClick={() =>
            !disabled &&
            API.actions.observations.updateTargetState(id, {
              active: true
            })
          }
          icon={disabled ? <Icon.Lock /> : undefined}
          type={disabled ? "outlined" : "contained"}
          metaTestId={ObservationMetaTestIds.selectRuleBtn}
          metaTestQualifier={`target-${index}`}
        />
      )}
    </div>
  );
};
