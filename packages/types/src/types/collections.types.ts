import {
  Result,
  User,
  Program,
  RuleResult,
  ResultData
} from "@parsimony/types";

export type IId = string;
export type IDate = Date;
export type ICollection = ISchool | User | Program | Result;

export type IResultsState = Record<string, RuleResult[]>;
export type ICompletenessState = Record<string, number>;
export type IResultData = Record<string, ResultData>;

export type ISchool = {
  id: IId;
  name: string;
  domain: string;
  userCount: number;
  accessTokens: [string];
};
