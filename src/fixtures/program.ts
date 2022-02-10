import { IOptionMultiSelect } from "../components/multiSelect";
import { IOption } from "../components/selector";
import {
  InputTypes,
  ProgramTypes,
  ProgramValueTypes,
  UserRoles
} from "../enums";
import { IProgram } from "../types";

export const initialProgramData: IProgram = {
  // Need to figure out how to remove ID from IProgram
  id: "",

  // Should be set in the data access
  dateCreated: new Date(),
  dateEdited: new Date(),
  // end
  title: "",
  description: "",
  writeAccess: [UserRoles.Director],
  readAccess: [UserRoles.Director],
  type: ProgramTypes.Main,
  // Set when auth service is set and can be set in the data access
  lastEditedBy: "",
  editedBy: [],
  createdBy: "",
  // end

  // This is the meet of what we need to add
  rules: [],

  // These will be added when people are tracking clients
  results: []
};

export const initialRuleData = {
  id: "",
  question: "",
  description: "",
  steps: 0,
  options: [],
  required: true,
  inputType: InputTypes.radio,
  valueType: ProgramValueTypes.number
};

export const initialOptionData = {
  name: "",
  value: 0
};

export const programTypes: IOption[] = [
  { name: ProgramTypes.Main, value: ProgramTypes.Main },
  { name: ProgramTypes.Client, value: ProgramTypes.Client }
];

export const inputTypes: IOption[] = [
  { name: InputTypes.radio, value: InputTypes.radio },
  { name: InputTypes.text, value: InputTypes.text }
];

export const programValueTypes: IOption[] = [
  { name: ProgramValueTypes.number, value: ProgramValueTypes.number },
  { name: ProgramValueTypes.string, value: ProgramValueTypes.string },
  { name: ProgramValueTypes.boolean, value: ProgramValueTypes.boolean },
  { name: ProgramValueTypes.date, value: ProgramValueTypes.date }
];

export const stepsOptions: IOption[] = [
  { name: "0", value: 0 },
  { name: "1", value: 1 },
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 }
];

export const userRoleOptions: IOptionMultiSelect[] = [
  { name: UserRoles.Admin, value: false },
  { name: UserRoles.Client, value: false },
  { name: UserRoles.Director, value: false },
  { name: UserRoles.Employee, value: false },
  { name: UserRoles.Guardian, value: false }
];
