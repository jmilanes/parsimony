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
