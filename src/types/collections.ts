import {
  UserRoles,
  ProgamTypes,
  InputTypes,
  ProgramValueTypes
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
  documents?: any; // These will be uploaded PDFs or maybe jpegs associated with clients
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
  dateCreated: IDate;
  dateEdited: IDate;
  writeAccess: UserRoles[];
  readAccess: UserRoles[];
  type: ProgamTypes;
  lastEditedBy: IId;
  editedBy: IId[];
  createdBy: IId;
  results: IResult[] | [];
};

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
  dateCreated: IDate;
  data: IResultData[];
};

type RuleId = IId;
export type IResultData = Record<RuleId, IResultDataValue[]>;

export type IResultDataValue = {
  step: number;
  value: number;
};
