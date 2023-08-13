import React from "react";
import { Button } from "../components";
import { Container as DI } from "typedi";
import {
  ObservationMetaTestIds,
  Target,
  TargetResult,
  TargetResultOption,
  TargetOption,
  Program
} from "@parsimony/types";
import { generateKey, compileStyles } from "../utils";
import "./styles.css";
import UIApi from "../domains/uiApi/uiApi.Service";
import { TASK_ANALYSIS_ID } from "../actions/appState/observations.actions";

export type IObserverTargetProps = React.PropsWithChildren<{
  target: Target | Target[];
  targetOptions: TargetOption[];
  program: Program;
  metaQualifierIndex?: number;
}>;

export const ObserveTarget = ({
  target,
  targetOptions,
  program,
  metaQualifierIndex
}: IObserverTargetProps) => {
  const API = DI.get(UIApi);

  const isTaskAnalysis = Array.isArray(target);

  //TODO MOVE TO ACTION
  const incrementStep = (targetId: string) => {
    const { currentStep } = API.actions.observations.getTargetState(targetId);

    if (currentStep === program.trials) {
      API.actions.observations.updateTargetState(targetId, {
        active: false,
        complete: true
      });
      return;
    }

    API.actions.observations.updateTargetState(targetId || "", {
      currentStep: currentStep + 1
    });
  };

  //TODO MOVE TO ACTION
  const decrementStep = (targetId: string) => {
    const { currentStep } = API.actions.observations.getTargetState(targetId);

    API.actions.observations.updateTargetState(targetId, {
      currentStep: currentStep - 1
    });
  };

  const updateTargetResultAtStep = (
    results: TargetResult[],
    data: TargetResult
  ) => {
    const update = [...results];
    const zeroIndexStep = (data.trial || 1) - 1;
    update[zeroIndexStep] = data;
    return update;
  };

  //TODO MOVE TO ACTION
  const updateResults = (resultData: TargetResult, target: Target) => {
    const id = target.id as string;
    const results = API.actions.observations.getTargetState(id).results;
    const updatedResultArray = results[id]
      ? updateTargetResultAtStep(results[id], resultData)
      : [resultData];

    API.actions.observations.updateTargetState(id, {
      results: {
        ...results,
        [id]: updatedResultArray
      }
    });

    API.actions.observations.updateCurrentTrialCompleteness();
    API.actions.observations.updateResultForTarget(target);
  };

  const getTargetId = (target: Target) =>
    targetOptions?.find((option) => !!option?.target)?.id || "";

  //TODO MOVE TO ACTION
  const selectOption = (
    option: TargetResultOption,
    currentStep: number,
    target: Target,
    targetId: string
  ) => {
    let completed = true;
    // If the selection is above the target option then you get a 100% completeness
    for (const opt of targetOptions || []) {
      if (opt?.target) break;
      if (opt?.id === option.id) {
        completed = false;
        break;
      }
    }
    const obj: TargetResult = {
      trial: currentStep,
      option,
      targetOptionId: targetId,
      completed
    };

    updateResults(obj, target);
    !isTaskAnalysis && incrementStep(target.id || "");
  };

  const InactiveTarget = ({
    target,
    index
  }: {
    target: Target;
    index: number;
  }) => {
    const id = isTaskAnalysis ? TASK_ANALYSIS_ID : target.id || "";
    const { complete } = API.actions.observations.getTargetState(id);
    const classes = isTaskAnalysis
      ? undefined
      : compileStyles({
          observeTarget: true,
          complete
        });
    const disabled = !API.actions.observations.isTrialActiveForChain(id);
    return (
      <div className={classes}>
        <h3>{target.title}</h3>
        {!isTaskAnalysis && (
          <Button
            name="Observe"
            // SPOT TO ADD CHAIN BLOCK
            disabled={disabled}
            action={() =>
              API.actions.observations.updateTargetState(id, {
                active: true
              })
            }
            type={disabled ? "outlined" : "contained"}
            metaTestId={ObservationMetaTestIds.selectRuleBtn}
            metaTestQualifier={`target-${index}`}
          />
        )}
      </div>
    );
  };

  const ActiveTarget = ({
    target,
    index
  }: {
    target: Target;
    index: number;
  }) => {
    const { currentStep, completeness, results } =
      API.actions.observations.getTargetState(target.id || "");

    const targetResults = results[target.id as string];

    const selectedId = API.actions.observations.getSelectedByTargetState(
      target.id || ""
    );

    return (
      <div
        className={compileStyles({
          activeObservationTarget: true,
          group: isTaskAnalysis
        })}
      >
        <div className="content">
          <div className="trial">
            {!isTaskAnalysis && (
              <>
                <h3>
                  {target.title} Trial: {currentStep}
                </h3>
                <h4 className="completeness">
                  Completeness: {completeness[target.id as string] || 0}%
                </h4>
              </>
            )}
            {isTaskAnalysis && <h3>{target.title}</h3>}
          </div>
          {currentStep > 1 && (
            <Button
              name="Back"
              action={() => decrementStep(target.id || "")}
              metaTestId={ObservationMetaTestIds.revertStepBtn}
            />
          )}
          {!isTaskAnalysis && (
            <Button
              name="Close"
              action={() =>
                API.actions.observations.updateTargetState(target.id || "", {
                  active: false
                })
              }
              metaTestId={ObservationMetaTestIds.closeRuleBtn}
            />
          )}
        </div>

        <div className="promptBtnContainer">
          {targetOptions?.map((option, i) => (
            <Button
              key={generateKey("optionButton", i)}
              name={option?.name as string}
              action={() =>
                selectOption(
                  option as TargetResultOption,
                  currentStep,
                  target,
                  getTargetId(target)
                )
              }
              type={selectedId === option.id ? "contained" : "outlined"}
              metaTestId={ObservationMetaTestIds.ruleOptionSelectBtn}
              metaTestQualifier={`target-${index.toString()}-prompt-${i}` || ""}
            />
          ))}
        </div>
      </div>
    );
  };

  const SingleTarget = ({
    target,
    index
  }: {
    target: Target;
    index: number;
  }) => {
    const id = isTaskAnalysis ? TASK_ANALYSIS_ID : target.id || "";
    const { active } = API.actions.observations.getTargetState(id);
    return active ? (
      <ActiveTarget target={target} index={index} />
    ) : (
      <InactiveTarget target={target} index={index} />
    );
  };

  const GroupControls = ({ firstTarget }: { firstTarget: Target }) => {
    const { currentStep } =
      API.actions.observations.getTargetState(TASK_ANALYSIS_ID);
    return (
      <div className="group-controls">
        <h3>Trial: {currentStep}</h3>
        <div className="group-contols-buttons">
          {currentStep > 1 && (
            <Button
              name="Back"
              action={() => decrementStep("taskAnalysis")}
              metaTestId={ObservationMetaTestIds.revertRuleBtn}
            />
          )}
          <Button
            name="Next Step"
            action={() => incrementStep("taskAnalysis")}
            metaTestId={ObservationMetaTestIds.nextRuleBtn}
          />
          <Button
            name="Close"
            action={() =>
              API.actions.observations.updateTargetState("taskAnalysis", {
                active: false
              })
            }
            metaTestId={ObservationMetaTestIds.closeGroupedRuleBtn}
          />
        </div>
      </div>
    );
  };

  const GroupTarget = () => {
    const { complete, active } =
      API.actions.observations.getTargetState(TASK_ANALYSIS_ID);

    return isTaskAnalysis ? (
      <div
        className={compileStyles({
          observeTarget: true,
          group: isTaskAnalysis,
          complete
        })}
      >
        {active && <GroupControls firstTarget={target[0]} />}
        {target.map((target, i) => (
          <SingleTarget key={i} target={target} index={i} />
        ))}
        {!active && (
          <Button
            name="Observe"
            action={() =>
              API.actions.observations.updateTargetState(TASK_ANALYSIS_ID, {
                active: true
              })
            }
            metaTestId={ObservationMetaTestIds.selectGroupedRuleBtn}
          />
        )}
      </div>
    ) : null;
  };

  return isTaskAnalysis ? (
    <GroupTarget />
  ) : (
    <SingleTarget target={target} index={metaQualifierIndex || 0} />
  );
};
