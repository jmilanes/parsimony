import { IOptionMultiSelect } from "../components/multiSelect";
import { IOption } from "../components/selector";
import {
  InputTypes,
  ProgramTypes,
  ProgramValueTypes,
  Prompts,
  PromptTypes,
  RuleStyle,
  UserRoles
} from "@parsimony/types";
import { Program } from "@parsimony/types";

const currentUser = localStorage.getItem("currentUserId");

export const initialProgramData: Program = {
  // Need to figure out how to remove ID from Program
  id: "",
  // end
  title: "",
  description: "",
  writeAccess: [UserRoles.Director],
  readAccess: [UserRoles.Director],
  type: ProgramTypes.Main,
  // Set when auth service is set and can be set in the data access
  lastEditedBy: currentUser,
  editedBy: [currentUser],
  createdBy: currentUser,
  // end

  // This is the meet of what we need to add
  rules: []
};

export const initialRuleData = {
  id: "",
  question: "",
  description: "",
  steps: 0,
  options: [],
  required: true,
  inputType: InputTypes.Radio,
  valueType: ProgramValueTypes.Number
};

export const initialOptionData = {
  name: "",
  value: 0
};

export const programTypes: IOption[] = [
  { name: ProgramTypes.Main, value: ProgramTypes.Main },
  { name: ProgramTypes.Client, value: ProgramTypes.Client }
];

export const ruleStyles: IOption[] = [
  { name: RuleStyle.Separate, value: RuleStyle.Separate },
  { name: RuleStyle.Group, value: RuleStyle.Group }
];

export const inputTypes: IOption[] = [
  { name: InputTypes.Radio, value: InputTypes.Radio },
  { name: InputTypes.Text, value: InputTypes.Text }
];

export const programValueTypes: IOption[] = [
  { name: ProgramValueTypes.Number, value: ProgramValueTypes.Number },
  { name: ProgramValueTypes.String, value: ProgramValueTypes.String },
  { name: ProgramValueTypes.Boolean, value: ProgramValueTypes.Boolean },
  { name: ProgramValueTypes.Date, value: ProgramValueTypes.Date }
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
  { name: UserRoles.Admin, value: UserRoles.Admin },
  { name: UserRoles.Client, value: UserRoles.Client },
  { name: UserRoles.Director, value: UserRoles.Director },
  { name: UserRoles.Employee, value: UserRoles.Employee },
  { name: UserRoles.Guardian, value: UserRoles.Guardian }
];

export const userRoleOptionsWithStringValues: IOption[] = [
  { name: UserRoles.Admin, value: UserRoles.Admin },
  { name: UserRoles.Client, value: UserRoles.Client },
  { name: UserRoles.Director, value: UserRoles.Director },
  { name: UserRoles.Employee, value: UserRoles.Employee },
  { name: UserRoles.Guardian, value: UserRoles.Guardian }
];

export const physicalPrompts: IOption[] = [
  { name: Prompts.FullPhysical, value: 1 },
  { name: Prompts.PartialPhysical, value: 2 },
  { name: Prompts.LightPhysical, value: 3 },
  { name: Prompts.Gesture, value: 4 },
  { name: Prompts.Independent, value: 5 }
];

export const verbalPrompts: IOption[] = [
  { name: Prompts.FullVerbalModel, value: 1 },
  { name: Prompts.PartialVerbalModel, value: 2 },
  { name: Prompts.InitialSoundCue, value: 3 },
  { name: Prompts.Phonetic, value: 4 },
  { name: Prompts.Independent, value: 5 }
];
export const timePrompts: IOption[] = [
  { name: Prompts.Immediate, value: 1 },
  { name: Prompts.TwoSecondDelay, value: 2 },
  { name: Prompts.FourSecondDelay, value: 3 },
  { name: Prompts.SixSecondDelay, value: 4 },
  { name: Prompts.EightSecondDelay, value: 5 },
  { name: Prompts.TenSecondDelay, value: 6 }
];

export const promptsByType: Record<PromptTypes, IOption[]> = {
  [PromptTypes.Physical]: physicalPrompts,
  [PromptTypes.Verbal]: verbalPrompts,
  [PromptTypes.Time]: timePrompts
};
