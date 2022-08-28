import { IOptionMultiSelect } from "../components/multiSelect.component";
import { IOption } from "../components/selector.component";
import {
  InputTypes,
  ProgramTypes,
  ProgramValueTypes,
  Prompts,
  PromptTypes,
  RuleOption,
  RuleStyle,
  UserRoles
} from "@parsimony/types";
import { Program } from "@parsimony/types";

const currentUser = localStorage.getItem("currentUserId");

// TODO: need to pass in the user...

export const initialProgramData: Program = {
  id: "",
  title: "",
  description: "",
  writeAccess: [UserRoles.Director],
  readAccess: [UserRoles.Director],
  type: ProgramTypes.Main,
  lastEditedBy: currentUser,
  editedBy: [currentUser],
  createdBy: currentUser,
  rules: [],
  mastered: false
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
  name: ""
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

export const physicalPrompts: RuleOption[] = [
  { name: Prompts.FullPhysical },
  { name: Prompts.PartialPhysical },
  { name: Prompts.LightPhysical },
  { name: Prompts.Gesture },
  { name: Prompts.Independent }
];

export const verbalPrompts: RuleOption[] = [
  { name: Prompts.FullVerbalModel },
  { name: Prompts.PartialVerbalModel },
  { name: Prompts.InitialSoundCue },
  { name: Prompts.Phonetic },
  { name: Prompts.Independent }
];
export const timePrompts: RuleOption[] = [
  { name: Prompts.Immediate },
  { name: Prompts.TwoSecondDelay },
  { name: Prompts.FourSecondDelay },
  { name: Prompts.SixSecondDelay },
  { name: Prompts.EightSecondDelay },
  { name: Prompts.TenSecondDelay }
];

export const promptsByType: Record<PromptTypes, RuleOption[]> = {
  [PromptTypes.Physical]: physicalPrompts,
  [PromptTypes.Verbal]: verbalPrompts,
  [PromptTypes.Time]: timePrompts
};
