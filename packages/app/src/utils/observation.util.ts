import React from "react";
import { clone } from "../utils";
import {
  ResultData,
  Rule,
  RuleResult,
  IResultsState,
  ICompletenessState,
  IResultData
} from "@parsimony/types";

export type IObserverRuleProps = React.PropsWithChildren<{
  rule: Rule | Rule[];
  onComplete: (result: IResultData) => void;
  patentActiveState?: boolean;
}>;

export const calculateCompleteness = (
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

export const parseResultsWithCompleteness = (
  results: IResultsState,
  completeness: ICompletenessState,
  setCompleteness: (c: ICompletenessState) => void,
  rule: Rule | Rule[]
) => {
  const cloneCompleteness = clone(completeness);
  const parsedResults = Object.entries(results).reduce(
    createResult(cloneCompleteness, rule, results),
    {}
  );
  setCompleteness(cloneCompleteness);
  return parsedResults;
};

export const createResult =
  (
    completeness: ICompletenessState,
    rule: Rule | Rule[],
    results: IResultsState
  ) =>
  (acc: IResultData, [key, value]: [string, RuleResult[]]) => {
    const processedRule = Array.isArray(rule)
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
