import React, { useEffect, useState } from "react";
import { getMax, getSum } from "../utils";
import { Container, Button } from "../components";
import { IResultData, IRule, IRuleResult } from "../types";
import { increment, decrement, generateKey, compileStyles } from "../utils";
import "./styles.css";

export type IObserverRuleProps = React.PropsWithChildren<{
  rule: IRule;
  onComplete: (result: IResultData) => void;
}>;

const ObserveRule = ({ rule, onComplete }: IObserverRuleProps) => {
  const [active, setActive] = useState(false);
  const [complete, setComplete] = useState(false);
  const [completeness, setCompleteness] = useState(0);
  const [results, setResults] = useState<IRuleResult[]>([]);
  const [step, setStep] = useState(1);

  const incrementStep = () => {
    if (rule.steps && step === rule.steps) {
      setComplete(true);
      setActive(false);
      return;
    }
    increment(step, setStep);
  };

  const calculateCompleteness = (rule: IRule, results: IRuleResult[]) => {
    const maxValue = getMax(rule.options).value;
    const numberOfResults = results.length;
    const resultSum = getSum(results, "option.value");
    const max = numberOfResults * maxValue;
    const completeness = (resultSum / max) * 100;
    setCompleteness(completeness);
    return completeness;
  };

  useEffect(() => {
    onComplete({
      [rule.id]: {
        ruleCompleteness: calculateCompleteness(rule, results),
        ruleResults: results
      }
    });
  }, [results]);

  const decrementStep = () => {
    decrement(step, setStep);
    // need to destroy the current result if it has been updated (be able to remove from the array)
  };

  const updateResults = (resultData: IRuleResult) =>
    setResults([...results, resultData]);

  const InactiveRule = () => {
    return (
      <div className={compileStyles({ observeRule: true, complete })}>
        <p>{rule.question}</p>
        <Button name="Observe" action={() => setActive(true)}></Button>
      </div>
    );
  };

  const selectOption = (
    option: { name: string; value: number },
    step: number
  ) => {
    console.log(option);
    const obj: IRuleResult = { step, option };
    updateResults(obj);
    incrementStep();
  };
  const ActiveRule = () => {
    return (
      <>
        <p>{rule.question}</p>
        <p>Individual Completeness: {completeness}%</p>
        <Button name="Close" action={() => setActive(false)}></Button>
        <Container>
          {step > 1 && <Button name="Back" action={decrementStep}></Button>}
          <h1>{step}</h1>
          {rule.options.map((option, i) => (
            <Button
              key={generateKey("optionButton", i)}
              name={option.name}
              action={() => selectOption(option, step)}
            />
          ))}
        </Container>
      </>
    );
  };
  return active ? <ActiveRule /> : <InactiveRule />;
};

export default ObserveRule;
