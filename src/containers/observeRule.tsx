import React, { useEffect, useState } from "react";
import { clone, getMax, getSum } from "../utils";
import { Container, Button } from "../components";
import { IResultData, IRule, IRuleResult } from "../types";
import { increment, decrement, generateKey, compileStyles } from "../utils";
import "./styles.css";

export type IObserverRuleProps = React.PropsWithChildren<{
  rule: IRule | IRule[];
  onComplete: (result: IResultData) => void;
  patentActiveState?: boolean;
}>;

export type IResultsState = Record<string, IRuleResult[]>;
export type ICompletenessState = Record<string, number>;

const ObserveRule = ({
  rule,
  onComplete,
  patentActiveState
}: IObserverRuleProps) => {
  const [active, setActive] = useState(patentActiveState || false);
  const [complete, setComplete] = useState(false);
  const [completeness, setCompleteness] = useState<ICompletenessState>({});
  const [results, setResults] = useState<IResultsState>({});
  const [step, setStep] = useState(1);

  const isGroup = Array.isArray(rule);

  const calculateCompleteness = (
    rule: IRule,
    results: IRuleResult[],
    completenessObj: ICompletenessState
  ) => {
    const maxValue = rule.options.reduce(getMax()).value;
    const numberOfResults = results.length;
    const resultSum = results.reduce(getSum("option.value"), 0);
    const max = numberOfResults * maxValue;
    const completenessTotal = (resultSum / max) * 100;
    completenessObj[rule.id] = completenessTotal;
    return completenessTotal;
  };

  useEffect(() => {
    if (Object.keys(results).length) {
      onComplete(parseResultsWithCompleteness(results));
    }
  }, [results]);

  const parseResultsWithCompleteness = (results: IResultsState) => {
    const cloneCompleteness = clone(completeness);
    const parsedResults = Object.entries(results).reduce(
      createResult(cloneCompleteness),
      {}
    );
    setCompleteness(cloneCompleteness);
    return parsedResults;
  };

  const createResult =
    (completeness: ICompletenessState) =>
    (acc: IResultData, [key, value]: [string, IRuleResult[]]) => {
      const processedRule = isGroup
        ? rule.find((rule) => rule.id === key)
        : rule;
      const ruleCompleteness = processedRule
        ? calculateCompleteness(processedRule, value, completeness)
        : 0;
      acc[key] = {
        ruleCompleteness,
        ruleResults: results[key]
      };
      return acc;
    };

  useEffect(() => {
    patentActiveState !== undefined && setActive(patentActiveState);
  }, [patentActiveState]);

  const incrementStep = (rule: IRule) => {
    // TODO: THE STEP MUST BE SAVED AS A NUMBER right now it is actually being saved as a string when you save the number
    if (rule.steps && step == rule.steps) {
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

  const updateRuleResultAtStep = (
    results: IRuleResult[],
    data: IRuleResult
  ) => {
    const update = [...results];
    update[data.step - 1] = data;
    return update;
  };

  const updateResults = (resultData: IRuleResult, rule: IRule) => {
    const updatedResults = results[rule.id]
      ? updateRuleResultAtStep(results[rule.id], resultData)
      : [resultData];
    setResults({
      ...results,
      [rule.id]: updatedResults
    });
  };

  const InactiveRule = (rule: IRule) => {
    const classes = isGroup
      ? undefined
      : compileStyles({ observeRule: true, complete });
    return (
      <div className={classes}>
        <p>{rule.question}</p>
        {!isGroup && (
          <Button name="Observe" action={() => setActive(true)}></Button>
        )}
      </div>
    );
  };

  const selectOption = (
    option: { name: string; value: number },
    step: number,
    rule: IRule
  ) => {
    const obj: IRuleResult = { step, option };
    updateResults(obj, rule);
    !isGroup && incrementStep(rule);
  };
  const ActiveRule = (rule: IRule) => {
    return (
      <>
        <p>{rule.question}</p>
        <p>Individual Completeness: {completeness[rule.id] || 0}%</p>
        {!isGroup && (
          <Button name="Close" action={() => setActive(false)}></Button>
        )}
        <Container>
          {step > 1 && <Button name="Back" action={decrementStep}></Button>}
          {!isGroup && <h1>{step}</h1>}
          {rule.options.map((option, i) => (
            <Button
              key={generateKey("optionButton", i)}
              name={option.name}
              action={() => selectOption(option, step, rule)}
            />
          ))}
        </Container>
      </>
    );
  };

  const SingleRule = (rule: IRule) =>
    active ? <ActiveRule {...rule} /> : <InactiveRule {...rule} />;

  const Rule = () =>
    isGroup ? (
      <div className={compileStyles({ observeRule: true, complete })}>
        {active && <h1>{step}</h1>}
        {active && (
          <Button name="Close" action={() => setActive(false)}></Button>
        )}
        {active && (
          <Button
            name="Next Step"
            action={() => incrementStep(rule[0])}
          ></Button>
        )}
        {step > 1 && active && (
          <Button name="Back" action={decrementStep}></Button>
        )}
        {rule.map((rule, i) => (
          <SingleRule key={i} {...rule} />
        ))}
        <Button name="Observe" action={() => setActive(true)}></Button>
      </div>
    ) : (
      <SingleRule {...rule} />
    );

  return <Rule />;
};

export default ObserveRule;
