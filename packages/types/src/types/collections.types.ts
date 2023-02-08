import {
  Result,
  User,
  Program,
  School,
  RuleResult,
  ResultData
} from "./generated/graphql.types";

export type IId = string;
export type IDate = Date;
export type ICollection = School | User | Program | Result;

export type IResultsState = Record<string, RuleResult[]>;
export type ICompletenessState = Record<string, number>;
export type IResultData = Record<string, ResultData>;
