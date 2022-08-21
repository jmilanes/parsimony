import React, { useEffect, useState } from "react";
import { clone, getMax, getSum } from "../utils";
import { Container, Button } from "../components";
import {
  ResultData,
  Rule,
  RuleResult,
  IResultsState,
  ICompletenessState,
  IResultData,
  RuleOption,
  RuleResultOption
} from "@parsimony/types";
import { increment, decrement, generateKey, compileStyles } from "../utils";
import "./styles.css";

export type IObserverRuleProps = React.PropsWithChildren<{
  rule: Rule | Rule[];
  onComplete: (result: IResultData) => void;
  patentActiveState?: boolean;
}>;

const calculateCompleteness = (
  rule: Rule,
  results: RuleResult[],
  completenessObj: ICompletenessState
) => {
  const max = results.length;
  const resultSum = results.filter((result) => !!result.completed).length;
  const completenessTotal = (resultSum / max) * 100;
  completenessObj[rule.id as string] = completenessTotal;
  return completenessTotal;
};

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
    (acc: IResultData, [key, value]: [string, RuleResult[]]) => {
      const processedRule = isGroup
        ? rule.find((rule) => rule.id === key)
        : rule;

      const ruleCompleteness = processedRule
        ? calculateCompleteness(processedRule, value, completeness)
        : 0;

      acc[key] = {
        ruleId: processedRule?.id,
        ruleCompleteness,
        ruleResults: results[key]
      } as ResultData;
      return acc;
    };

  useEffect(() => {
    patentActiveState !== undefined && setActive(patentActiveState);
  }, [patentActiveState]);

  const incrementStep = (rule: Rule) => {
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

  const updateRuleResultAtStep = (results: RuleResult[], data: RuleResult) => {
    const update = [...results];
    update[(data.step || 0) - 1] = data;
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

  const InactiveRule = (rule: Rule) => {
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

  const selectOption = (option: RuleResultOption, step: number, rule: Rule) => {
    const targetId = rule.options?.find((option) => !!option?.target)?.id;
    type IndexObj = { targetIndex: number; optionIndex: number };

    const indexObj = rule.options?.reduce((acc: IndexObj, curr, index) => {
      if (curr?.target) acc.targetIndex = index;
      if (curr?.id === option.id) acc.optionIndex = index;
      return acc as IndexObj;
    }, {} as IndexObj) as IndexObj;

    const completed = indexObj.optionIndex >= indexObj.targetIndex;

    const obj: RuleResult = {
      step,
      option,
      targetId,
      completed
    };
    updateResults(obj, rule);
    !isGroup && incrementStep(rule);
  };

  const ActiveRule = (rule: Rule) => {
    return (
      <>
        <p>{rule.question}</p>
        <p>Individual Completeness: {completeness[rule.id as string] || 0}%</p>
        {!isGroup && (
          <Button name="Close" action={() => setActive(false)}></Button>
        )}
        <Container>
          {step > 1 && <Button name="Back" action={decrementStep}></Button>}
          {!isGroup && <h1>{step}</h1>}
          {rule?.options?.map((option, i) => (
            <Button
              key={generateKey("optionButton", i)}
              name={option?.name as string}
              //!! RuleResultOption and RuleOption are the same thing in type def need to share...
              action={() =>
                selectOption(option as RuleResultOption, step, rule)
              }
            />
          ))}
        </Container>
      </>
    );
  };

  const SingleRule = (rule: Rule) =>
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
