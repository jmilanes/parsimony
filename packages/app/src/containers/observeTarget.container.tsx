import React, { useEffect, useState } from "react";
import { Container, Button } from "../components";
import {
  IResultsState,
  ICompletenessState,
  IResultData,
  ObservationMetaTestIds,
  Target,
  TargetResult,
  TargetResultOption
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
  updateResultData: (result: IResultData) => void;
  programTrials: number;
  patentActiveState?: boolean;
}>;

export const ObserveTarget = ({
  target,
  updateResultData,
  patentActiveState,
  programTrials
}: IObserverTargetProps) => {
  // TODO: Revisit this and latest results
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
    target.options?.find((option) => !!option?.target)?.id || "";

  const selectOption = (
    option: TargetResultOption,
    currentStep: number,
    target: Target,
    targetId: string
  ) => {
    let completed = true;
    // If the selection is above the target option then you get a 100% completeness
    for (const opt of target.options || []) {
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

  const InactiveTarget = (target: Target) => {
    const classes = isGroup
      ? undefined
      : compileStyles({ observeTarget: true, complete });
    return (
      <div className={classes}>
        <p>{target.title}</p>
        {!isGroup && (
          <Button
            name="Observe"
            action={() => setActive(true)}
            metaTestId={ObservationMetaTestIds.selectRuleBtn}
          />
        )}
      </div>
    );
  };

  const ActiveTarget = (target: Target) => {
    return (
      <>
        <p>{target.title}</p>
        <p>
          Individual Completeness: {completeness[target.id as string] || 0}%
        </p>
        {!isGroup && (
          <Button
            name="Close"
            action={() => setActive(false)}
            metaTestId={ObservationMetaTestIds.closeRuleBtn}
          />
        )}
        <Container>
          {currentStep > 1 && (
            <Button
              name="Back"
              action={decrementStep}
              metaTestId={ObservationMetaTestIds.revertStepBtn}
            />
          )}
          {!isGroup && <h1>{currentStep}</h1>}
          {target?.options?.map((option, i) => (
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
              // TODO: Test id with option name
              metaTestId={ObservationMetaTestIds.ruleOptionSelectBtn}
              metaTestQualifier={option?.name || ""}
            />
          ))}
        </Container>
      </>
    );
  };

  const SingleTarget = (target: Target) =>
    active ? <ActiveTarget {...target} /> : <InactiveTarget {...target} />;

  const GroupControls = ({ firstTarget }: { firstTarget: Target }) => {
    return (
      <>
        <h1>{currentStep}</h1>
        <Button
          name="Close"
          action={() => setActive(false)}
          metaTestId={ObservationMetaTestIds.closeGroupedRuleBtn}
        />
        <Button
          name="Next Step"
          action={() => incrementStep(firstTarget)}
          metaTestId={ObservationMetaTestIds.nextRuleBtn}
        />
        {currentStep > 1 && (
          <Button
            name="Back"
            action={decrementStep}
            metaTestId={ObservationMetaTestIds.revertRuleBtn}
          />
        )}
      </>
    );
  };

  const GroupTarget = () => {
    return isGroup ? (
      <div className={compileStyles({ observeTarget: true, complete })}>
        {active && <GroupControls firstTarget={target[0]} />}
        {target.map((target, i) => (
          <SingleTarget key={i} {...target} />
        ))}
        <Button
          name="Observe"
          action={() => setActive(true)}
          metaTestId={ObservationMetaTestIds.selectGroupedRuleBtn}
        />
      </div>
    ) : null;
  };

  return isGroup ? <GroupTarget /> : <SingleTarget {...target} />;
};
