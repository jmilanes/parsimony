import {
  InputTypes,
  ProgamTypes,
  ProgramValueTypes,
  UserRoles
} from "../enums";
import { IProgram } from "../types";

export const initalProgramData: IProgram = {
  // Need to figure out how to remove ID from IProgram
  id: "",

  //Should be set in the data access
  dateCreated: new Date(),
  dateEdited: new Date(),
  //end
  title: "",
  writeAccess: [UserRoles.Director],
  readAccess: [UserRoles.Director],
  type: ProgamTypes.Main,
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

export const intialRuleData = {
  id: "",
  question: "",
  description: "",
  steps: 0,
  options: [],
  required: true,
  inputType: InputTypes.radio,
  valueType: ProgramValueTypes.number
};

export const initalOptionData = {
  name: "",
  value: 0
};
