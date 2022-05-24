import { IOption } from "../components/selector";
import {
  UserRoles,
  ProgramTypes,
  InputTypes,
  ProgramValueTypes,
  RuleStyle
} from "../enums";

export type IId = string;
export type IDate = Date;
export type ICollection = ISchool | IUser | IProgram;

export type ISchool = {
  id: IId;
  name: string;
  domain: string;
  userCount: number;
  accessTokens: [string];
};

export type IUserWithoutID = Omit<IUser, "id">;

export type IUser = {
  id: IId;
  contactInformation: IContactInformation;
  dateCreated: IDate;
  dateEdited: IDate;
  schoolId: string;
  timeZone?: string;
  roles: UserRoles[];
  type: UserRoles;
  documents?: unknown; // These will be uploaded PDFs or maybe jpegs associated with clients
};

export type IContactInformation = {
  firstName: string;
  lastName: string;
  dateOfBirth: IDate;
  phone: string;
  contacts: IId[] | [];
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
