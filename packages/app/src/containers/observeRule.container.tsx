import React, { useEffect, useState } from "react";
import { Container, Button } from "../components";
import {
  Rule,
  RuleResult,
  IResultsState,
  ICompletenessState,
  IResultData,
  RuleResultOption,
  ObservationDataIds
} from "@parsimony/types";
import {
  increment,
  decrement,
  generateKey,
  compileStyles,
  parseResultsWithCompleteness
} from "../utils";
import "./styles.css";
import { curry } from "ramda";

export type IObserverRuleProps = React.PropsWithChildren<{
  rule: Rule | Rule[];
  updateResultData: (result: IResultData) => void;
  patentActiveState?: boolean;
}>;

export const ObserveRule = ({
  rule,
  updateResultData,
  patentActiveState
}: IObserverRuleProps) => {
  // TODO: Revisit this and latest results
  const [active, setActive] = useState(patentActiveState || false);
  const [complete, setComplete] = useState(false);
  const [completeness, setCompleteness] = useState<ICompletenessState>({});
  const [results, setResults] = useState<IResultsState>({});
  const [step, setStep] = useState(1);

  const isGroup = Array.isArray(rule);

  useEffect(() => {
    if (Object.keys(results).length) {
      const latestResult = parseResultsWithCompleteness(
        results,
        completeness,
        setCompleteness,
        rule
      );

      updateResultData(latestResult);
    }
  }, [results]);

  useEffect(() => {
    patentActiveState !== undefined && setActive(patentActiveState);
  }, [patentActiveState]);

  // TODO: Make this cleaner
  const incrementStep = (rule: Rule) => {
    if (rule.steps && step === rule.steps) {
      setComplete(true);
      setActive(false);
      return;
    }
    increment(step, setStep);
  };

  const decrementStep = () => {
    decrement(step, setStep);
    // need to destroy the current result if it has been updated (be able to remove from the array)
  };

  const updateRuleResultAtStep = (results: RuleResult[], data: RuleResult) => {
    const update = [...results];
    const zeroIndexStep = (data.step || 1) - 1;
    update[zeroIndexStep] = data;
    return update;
  };

  const updateResults = (resultData: RuleResult, rule: Rule) => {
    const id = rule.id as string;
    const updatedResultArray = results[id]
      ? updateRuleResultAtStep(results[id], resultData)
      : [resultData];

    setResults({
      ...results,
      [id]: updatedResultArray
    });
  };

  const getTargetId = (rule: Rule) =>
    rule.options?.find((option) => !!option?.target)?.id || "";

  const selectOption = (
    option: RuleResultOption,
    step: number,
    rule: Rule,
    targetId: string
  ) => {
    let completed = true;
    // If the selection is above the target option then you get a 100% completeness
    for (const opt of rule.options || []) {
      if (opt?.target) break;
      if (opt?.id === option.id) {
        completed = false;
        break;
      }
    }
    const obj: RuleResult = {
      step,
      option,
      targetId,
      completed
    };

    updateResults(obj, rule);
    !isGroup && incrementStep(rule);
  };

  // TODO --END--

  const InactiveRule = (rule: Rule) => {
    const classes = isGroup
      ? undefined
      : compileStyles({ observeRule: true, complete });
    return (
      <div className={classes}>
        <p>{rule.question}</p>
        {!isGroup && (
          <Button
            name="Observe"
            action={() => setActive(true)}
            dataTestId={ObservationDataIds.selectRuleBtn}
          />
        )}
      </div>
    );
  };

  const ActiveRule = (rule: Rule) => {
    return (
      <>
        <p>{rule.question}</p>
        <p>Individual Completeness: {completeness[rule.id as string] || 0}%</p>
        {!isGroup && (
          <Button
            name="Close"
            action={() => setActive(false)}
            dataTestId={ObservationDataIds.closeRuleBtn}
          />
        )}
        <Container>
          {step > 1 && (
            <Button
              name="Back"
              action={decrementStep}
              dataTestId={ObservationDataIds.revertStepBtn}
            />
          )}
          {!isGroup && <h1>{step}</h1>}
          {rule?.options?.map((option, i) => (
            <Button
              key={generateKey("optionButton", i)}
              name={option?.name as string}
              //!! RuleResultOption and RuleOption are the same thing in type def need to share...
              action={() =>
                selectOption(
                  option as RuleResultOption,
                  step,
                  rule,
                  getTargetId(rule)
                )
              }
              // TODO: Test id with option name
              dataTestId={ObservationDataIds.ruleOptionSelectBtn}
              dataTestQualifier={option?.name || ""}
            />
          ))}
        </Container>
      </>
    );
  };

  const SingleRule = (rule: Rule) =>
    active ? <ActiveRule {...rule} /> : <InactiveRule {...rule} />;

  const GroupControls = ({ firstRule }: { firstRule: Rule }) => {
    return (
      <>
        <h1>{step}</h1>
        <Button
          name="Close"
          action={() => setActive(false)}
          dataTestId={ObservationDataIds.closeGroupedRuleBtn}
        />
        <Button
          name="Next Step"
          action={() => incrementStep(firstRule)}
          dataTestId={ObservationDataIds.nextRuleBtn}
        />
        {step > 1 && (
          <Button
            name="Back"
            action={decrementStep}
            dataTestId={ObservationDataIds.revertRuleBtn}
          />
        )}
      </>
    );
  };

  const GroupRule = () => {
    return isGroup ? (
      <div className={compileStyles({ observeRule: true, complete })}>
        {active && <GroupControls firstRule={rule[0]} />}
        {rule.map((rule, i) => (
          <SingleRule key={i} {...rule} />
        ))}
        <Button
          name="Observe"
          action={() => setActive(true)}
          dataTestId={ObservationDataIds.selectGroupedRuleBtn}
        />
      </div>
    ) : null;
  };

  return isGroup ? <GroupRule /> : <SingleRule {...rule} />;
};
