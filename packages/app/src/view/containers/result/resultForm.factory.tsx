import React from "react";
import {
  Result,
  Program,
  BehaviorType,
  DiscreteTrial,
  TaskAnalysis
} from "@parsimony/types";
import { InputForm } from "../../../domains/forms/form";
import { DurationResultForm } from "./durationResult.form";
import { FrequencyResultForm } from "./frequencyResult.form";
import { IntervalResultForm } from "./intervalResult.form";
import { TrialResultForm } from "./trialResult.form";
import { isTrial } from "../../../utils";

export type ResultFormProps = {
  program: Program;
  form: InputForm<Result>;
  isReadonly: boolean;
};

const resultForms: Record<string, React.FC<ResultFormProps>> = {
  [BehaviorType.Duration]: DurationResultForm,
  [BehaviorType.Frequency]: FrequencyResultForm,
  [BehaviorType.Interval]: IntervalResultForm
};

export const ResultFormFactory = ({ program, ...rest }: ResultFormProps) => {
  // Type should be moved out ouf behavior and the results should be also
  //TODO: Make this a true factory
  // Move to type of program
  if (isTrial(program)) {
    return (
      <TrialResultForm
        {...rest}
        program={program as DiscreteTrial | TaskAnalysis}
      />
    );
  }
  const Comp = resultForms[program.viewType];
  return <Comp {...rest} program={program} />;
};
