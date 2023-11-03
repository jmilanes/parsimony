import React from "react";
import { Button } from "../../components";
import { Container as DI } from "typedi";
import { ObservationMetaTestIds, Target } from "@parsimony/types/dist";
import { compileStyles } from "../../../utils";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";
import { Discrete_Trial_ID } from "../../../domains/state/appState/actions/observations.actions";
import { InactiveTarget } from "./inactiveTarget.container";
import { ActiveTarget } from "./activeTarget.container";
import { DiscreteTrialsControlsContainer } from "./discreteTrialsControlsContainer";

export type IObserverTargetProps = React.PropsWithChildren<{
  target: Target | Target[];
  metaQualifierIndex?: number;
}>;

export const ObserveTarget = ({
  target,
  metaQualifierIndex
}: IObserverTargetProps) => {
  const API = DI.get(UIApi);

  const isDiscreteTrial = Array.isArray(target);

  const Target = ({ target, index }: { target: Target; index: number }) => {
    const id = isDiscreteTrial ? Discrete_Trial_ID : target.id || "";
    const { active } = API.actions.observations.getTargetState(id);
    return active ? (
      <ActiveTarget target={target} index={index} />
    ) : (
      <InactiveTarget target={target} index={index} />
    );
  };

  const DiscreteTrialContainer = () => {
    const { complete, active } =
      API.actions.observations.getTargetState(Discrete_Trial_ID);

    const isDiscreteTrial = Array.isArray(target);

    return isDiscreteTrial ? (
      <div
        className={compileStyles({
          observeTarget: true,
          group: isDiscreteTrial,
          complete
        })}
      >
        {active && <DiscreteTrialsControlsContainer />}
        {target.map((target, i) => (
          <Target key={i} target={target} index={i} />
        ))}
        {!active && (
          <Button
            name="Observe"
            type="contained"
            action={() =>
              API.actions.observations.updateTargetState(Discrete_Trial_ID, {
                active: true
              })
            }
            metaTestId={ObservationMetaTestIds.selectGroupedRuleBtn}
          />
        )}
      </div>
    ) : null;
  };

  return isDiscreteTrial ? (
    <DiscreteTrialContainer />
  ) : (
    <Target target={target} index={metaQualifierIndex || 0} />
  );
};
