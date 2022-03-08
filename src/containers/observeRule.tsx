import React, { useEffect, useState } from "react";
import { Container, Header, Button } from "../components";
import { IOption } from "../components/selector";
import { initialResultData } from "../fixtures";
import { IResult, IResultData, IResultDataValue, IRule } from "../types";
import { increment, decrement, generateKey, compileStyles } from "../utils";
import "./styles.css";

export type IObserverRuleProps = React.PropsWithChildren<{
  rule: IRule;
  onComplete: (result: IResultData) => void;
}>;

const ObserveRule = ({ rule, onComplete }: IObserverRuleProps) => {
  const [active, setActive] = useState(false);
  const [complete, setComplete] = useState(false);
  const [results, setResults] = useState<IResultDataValue[]>([]);
  const [step, setStep] = useState(1);

  const incrementStep = () => {
    if (rule.steps && step === rule.steps) {
      setComplete(true);
      setActive(false);
      return;
    }
    increment(step, setStep);
  };

  useEffect(() => {
    onComplete({ [rule.id]: results });
  }, [results]);

  const decrementStep = () => {
    decrement(step, setStep);
    // need to destroy the current result if it has been updated (be able to remove from the array)
  };

  const updateResults = (resultData: IResultDataValue) =>
    setResults([...results, resultData]);

  const InactiveRule = () => {
    return (
      <div className={compileStyles({ observeRule: true, complete })}>
        <p>{rule.question}</p>
        <Button name="Observe" action={() => setActive(true)}></Button>
      </div>
    );
  };

  const selectOption = (option: IOption, step: number) => {
    console.log(option);
    updateResults({ step, option });
    incrementStep();
  };
  const ActiveRule = () => {
    return (
      <>
        <p>{rule.question}</p>
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
