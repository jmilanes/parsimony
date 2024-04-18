import React from "react";
import {
  Result,
  Program,
  BehaviorType,
  TaskAnalysis,
  DiscreteTrial
} from "@parsimony/types";
import { InputForm } from "../../../domains/forms/form";
import { DurationResultForm } from "./durationResult.form";
import { FrequencyResultForm } from "./frequencyResult.form";
import { IntervalResultForm } from "./intervalResult.form";
import { TrialResultForm } from "./trialResult.form";
import { isTrial } from "../../../utils";

export type ResultFormProps = {
  program: TaskAnalysis | DiscreteTrial;
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
  // Move to type of program
  if (isTrial(program)) {
    return <TrialResultForm {...rest} program={program} />;
  }
  const Comp = resultForms[program.viewType];
  return <Comp {...rest} program={program} />;
};
