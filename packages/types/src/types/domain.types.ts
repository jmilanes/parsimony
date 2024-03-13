import { ResultData, TargetResult } from "../specification";

export type IId = string;

export type IResultsState = Record<string, TargetResult[]>;
export type ICompletenessState = Record<string, number>;
export type IResultData = Record<string, ResultData>;
