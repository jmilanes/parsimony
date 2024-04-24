import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import {
  CreateResultPayload,
  Domains,
  IObject,
  Program,
  ProgramViewTypes,
  Result
} from "@parsimony/types";
import cn from "classnames";
import { initialResultData } from "../fixtures";

export const uuid = () => uuidv4();

export const clone = <T>(obj: any) => _.clone(obj);

export const setDataWithPath = (obj: IObject, path: string, value: unknown) =>
  _.set(obj, path, value);

export const getDataWithPath = (obj: IObject, path: string): unknown =>
  _.get(obj, path);

export const compileStyles = (classes: Record<string, boolean>) => cn(classes);

export const isBehavior = (program: Program) => [
  ProgramViewTypes.FrequencyBehavior,
  ProgramViewTypes.DurationBehavior,
  ProgramViewTypes.IntervalBehavior
];
export const isTrial = (program: Program) =>
  [ProgramViewTypes.TaskAnalysis, ProgramViewTypes.DiscreteTrials].includes(
    program.viewType
  );

export const buildCreateBehaviorRequest = ({
  program,
  result,
  notes
}: {
  program: Program;
  result: number;
  notes: string;
}) => {
  const date = new Date();
  return {
    ...new Result(),
    clientId: program?.clientId || "",
    programId: program?.id || "",
    type: program.type,
    result,
    created_at: date,
    updated_at: date,
    notes
  } as CreateResultPayload;
};
