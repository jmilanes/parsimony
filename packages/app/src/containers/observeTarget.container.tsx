import React, { useEffect, useState } from "react";
import { Container, Button } from "../components";
import {
  IResultsState,
  ICompletenessState,
  IResultData,
  ObservationMetaTestIds,
  Target,
  TargetResult,
  TargetResultOption,
  TargetOption
} from "@parsimony/types";
import {
  increment,
  decrement,
  generateKey,
  compileStyles,
  parseResultsWithCompleteness
} from "../utils";
import "./styles.css";

export type IObserverTargetProps = React.PropsWithChildren<{
  target: Target | Target[];
  targetOptions: TargetOption[];
  updateResultData: (result: IResultData) => void;
  programTrials: number;
  patentActiveState?: boolean;
  metaQualifierIndex?: number;
}>;

export const ObserveTarget = ({
  target,
  targetOptions,
  updateResultData,
  patentActiveState,
  programTrials,
  metaQualifierIndex
}: IObserverTargetProps) => {
  const [active, setActive] = useState(patentActiveState || false);
  const [complete, setComplete] = useState(false);
  const [completeness, setCompleteness] = useState<ICompletenessState>({});
  const [results, setResults] = useState<IResultsState>({});
  const [currentStep, setCurrentStep] = useState(1);

  const isGroup = Array.isArray(target);

  useEffect(() => {
    if (Object.keys(results).length) {
      const latestResult = parseResultsWithCompleteness(
        results,
        completeness,
        setCompleteness,
        target
      );

      updateResultData(latestResult);
    }
  }, [results]);

  useEffect(() => {
    patentActiveState !== undefined && setActive(patentActiveState);
  }, [patentActiveState]);

  const incrementStep = (target: Target) => {
    if (currentStep === programTrials) {
      setComplete(true);
      setActive(false);
      return;
    }
    increment(currentStep, setCurrentStep);
  };

  const decrementStep = () => {
    decrement(currentStep, setCurrentStep);
    // need to destroy the current result if it has been updated (be able to remove from the array)
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

  const updateResults = (resultData: TargetResult, target: Target) => {
    const id = target.id as string;
    const updatedResultArray = results[id]
      ? updateTargetResultAtStep(results[id], resultData)
      : [resultData];

    setResults({
      ...results,
      [id]: updatedResultArray
    });
  };

  const getTargetId = (target: Target) =>
    targetOptions?.find((option) => !!option?.target)?.id || "";

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
    !isGroup && incrementStep(target);
  };

  const InactiveTarget = ({
    target,
    index
  }: {
    target: Target;
    index: number;
  }) => {
    const classes = isGroup
      ? undefined
      : compileStyles({ observeTarget: true, complete });
    return (
      <div className={classes}>
        <h3>{target.title}</h3>
        {!isGroup && (
          <Button
            name="Observe"
            action={() => setActive(true)}
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
    return (
      <div
        className={compileStyles({
          activeObservationTarget: true,
          group: isGroup
        })}
      >
        <div className="content">
          <div className="trial">
            {!isGroup && (
              <>
                <h3>
                  {target.title} Trial: {currentStep}
                </h3>
                <h4 className="completeness">
                  Completeness: {completeness[target.id as string] || 0}%
                </h4>
              </>
            )}
            {isGroup && <h3>{target.title}</h3>}
          </div>
          {!isGroup && (
            <Button
              name="Close"
              action={() => setActive(false)}
              metaTestId={ObservationMetaTestIds.closeRuleBtn}
            />
          )}
          {currentStep > 1 && (
            <Button
              name="Back"
              action={decrementStep}
              metaTestId={ObservationMetaTestIds.revertStepBtn}
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
              metaTestId={ObservationMetaTestIds.ruleOptionSelectBtn}
              metaTestQualifier={`target-${index.toString()}-prompt-${i}` || ""}
            />
          ))}
        </div>
      </div>
    );
  };

  const SingleTarget = ({ target, index }: { target: Target; index: number }) =>
    active ? (
      <ActiveTarget target={target} index={index} />
    ) : (
      <InactiveTarget target={target} index={index} />
    );

  const GroupControls = ({ firstTarget }: { firstTarget: Target }) => {
    return (
      <div className="group-controls">
        <h3>Trial: {currentStep}</h3>
        <div className="group-contols-buttons">
          {currentStep > 1 && (
            <Button
              name="Back"
              action={decrementStep}
              metaTestId={ObservationMetaTestIds.revertRuleBtn}
            />
          )}
          <Button
            name="Next Step"
            action={() => incrementStep(firstTarget)}
            metaTestId={ObservationMetaTestIds.nextRuleBtn}
          />
          <Button
            name="Close"
            action={() => setActive(false)}
            metaTestId={ObservationMetaTestIds.closeGroupedRuleBtn}
          />
        </div>
      </div>
    );
  };

  const GroupTarget = () => {
    return isGroup ? (
      <div
        className={compileStyles({
          observeTarget: true,
          group: isGroup,
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
            action={() => setActive(true)}
            metaTestId={ObservationMetaTestIds.selectGroupedRuleBtn}
          />
        )}
      </div>
    ) : null;
  };

  return isGroup ? (
    <GroupTarget />
  ) : (
    <SingleTarget target={target} index={metaQualifierIndex || 0} />
  );
};
