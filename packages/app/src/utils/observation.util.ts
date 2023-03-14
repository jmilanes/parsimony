import React from "react";
import { clone } from "../utils";
import {
  ResultData,
  IResultsState,
  ICompletenessState,
  IResultData,
  Target,
  TargetResult
} from "@parsimony/types";

export type IObserverTargetProps = React.PropsWithChildren<{
  target: Target | Target[];
  onComplete: (result: IResultData) => void;
  patentActiveState?: boolean;
}>;

export const calculateCompleteness = (
  target: Target,
  results: TargetResult[],
  completenessObj: ICompletenessState
) => {
  const max = results.length;
  const resultSum = results.filter((result) => !!result.completed).length;
  const completenessTotal = (resultSum / max) * 100;
  completenessObj[target.id as string] = completenessTotal;
  return completenessTotal;
};

// TODO: Make sense of these
export const parseResultsWithCompleteness = (
  results: IResultsState,
  completeness: ICompletenessState,
  setCompleteness: (c: ICompletenessState) => void,
  target: Target | Target[]
) => {
  const cloneCompleteness = clone(completeness);
  const parsedResults = Object.entries(results).reduce(
    createResult(cloneCompleteness, target, results),
    {}
  );
  setCompleteness(cloneCompleteness);
  return parsedResults;
};

export const createResult =
  (
    completeness: ICompletenessState,
    target: Target | Target[],
    results: IResultsState
  ) =>
  (acc: IResultData, [key, value]: [string, TargetResult[]]) => {
    const processedTarget = Array.isArray(target)
      ? target.find((target) => target.id === key)
      : target;

    const targetCompleteness = processedTarget
      ? calculateCompleteness(processedTarget, value, completeness)
      : 0;

    acc[key] = {
      targetId: processedTarget?.id,
      targetCompleteness,
      targetResults: results[key]
    } as ResultData;

    return acc;
  };

export default class HandleTargetService {}
