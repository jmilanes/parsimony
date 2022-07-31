import {
  UserRoles,
  ProgramTypes,
  InputTypes,
  ProgramValueTypes,
  RuleStyle,
  User
} from "@parsimony/types";

export type IId = string;
export type IDate = Date;
export type ICollection = ISchool | User | IProgram;

export type ISchool = {
  id: IId;
  name: string;
  domain: string;
  userCount: number;
  accessTokens: [string];
};

export type IProgram = {
  id: IId;
  title: string;
  mainProgramId?: IId;
  clientId?: IId;
  rules: IRule[];
  description?: string;
  dateCreated: IDate;
  dateEdited: IDate;
  writeAccess: UserRoles[];
  readAccess: UserRoles[];
  type: ProgramTypes;
  lastEditedBy: IId;
  editedBy: IId[];
  createdBy: IId;
  ruleStyle?: RuleStyle;
};

// This will either show rules in the program as one group or give each group it's own group stepper
// export type RuleStyle = "GROUP" | "SINGLE";

export type IRule = {
  id: IId;
  question: string;
  description: string;
  steps?: number;
  options: IRuleOption[];
  required: boolean;
  inputType: InputTypes;
  valueType: ProgramValueTypes;
};

export type IRuleOption = {
  name: string;
  value: number;
};

export type IResult = {
  id: IId;
  dateCreated: IDate;
  programId: IId;
  clientId?: IId;
  programCompleteness: number;
  data: IResultData;
};

type RuleId = IId;

export type IResultData = Record<RuleId, IResultRuleData>;

export type IResultRuleData = {
  ruleCompleteness: number;
  ruleResults: IRuleResult[];
};

export type IRuleResult = {
  step: number;
  option: { name: string; value: number };
};
