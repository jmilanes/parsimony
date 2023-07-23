import { IOptionMultiSelect } from "../components/multiSelect.component";

import {
  BehaviorType,
  InputTypes,
  Program,
  ProgramCategories,
  ProgramTypes,
  ProgramValueTypes,
  Prompts,
  PromptTypes,
  Target,
  TargetOption,
  TargetStyle,
  TrialChainingDirections,
  UserRoles
} from "@parsimony/types";
import { IOption } from "../components";

export const currentUserLS = localStorage.getItem("currentUserId");

// TODO: need to pass in the user... or make this better

export const initialProgramData: Program = {
  id: "",
  title: "",
  description: "",
  materials: "",
  writeAccess: [],
  readAccess: [],
  type: ProgramTypes.Main,
  lastEditedBy: currentUserLS,
  editedBy: [currentUserLS],
  createdBy: currentUserLS,
  trials: 1,
  targets: [],
  mastered: false,
  category: ProgramCategories.Aba,
  targetOptions: [],
  masterTargetPercent: 100,
  masterTargetCount: 3,
  subscribers: [currentUserLS],
  collectionId: ""
};

export const initialBehaviorData: Program = {
  id: "",
  title: "",
  description: "",
  materials: "",
  writeAccess: [],
  readAccess: [],
  type: ProgramTypes.Main,
  lastEditedBy: currentUserLS,
  editedBy: [currentUserLS],
  createdBy: currentUserLS,
  trials: 1,
  mastered: false,
  targetOptions: [],
  targetStyle: TargetStyle.Behavior,
  masterTargetPercent: 100,
  masterTargetCount: 3,
  subscribers: [currentUserLS],
  collectionId: "",
  behavior: {
    alertTime: 0,
    type: BehaviorType.Tally,
    active: true
  }
};

export const initialTargetData: Target = {
  id: "",
  title: "",
  description: "",
  required: true,
  inputType: InputTypes.Radio,
  valueType: ProgramValueTypes.Number,
  mastered: false,
  currentMasterCount: 0
};

export const initialOptionData = {
  name: "",
  target: false
};

export const programTypes: IOption[] = [
  { name: ProgramTypes.Main, value: ProgramTypes.Main },
  { name: ProgramTypes.Client, value: ProgramTypes.Client }
];

export const behaviorTypes: IOption[] = [
  { name: BehaviorType.Tally, value: BehaviorType.Tally },
  {
    name: BehaviorType.Time,
    value: BehaviorType.Time
  },
  { name: BehaviorType.Interval, value: BehaviorType.Interval }
];

export const targetStyles: IOption[] = [
  { name: TargetStyle.DiscreteTrials, value: TargetStyle.DiscreteTrials },
  { name: TargetStyle.TaskAnalysis, value: TargetStyle.TaskAnalysis }
];

export const programCategories: IOption[] = [
  { name: ProgramCategories.Aba, value: ProgramCategories.Aba },
  { name: ProgramCategories.Ell, value: ProgramCategories.Ell },
  {
    name: ProgramCategories.CounselingTherapeutic,
    value: ProgramCategories.CounselingTherapeutic
  },
  { name: ProgramCategories.Math, value: ProgramCategories.Math },
  {
    name: ProgramCategories.ExecutiveFunctioning,
    value: ProgramCategories.ExecutiveFunctioning
  },
  {
    name: ProgramCategories.Occupational,
    value: ProgramCategories.Occupational
  },
  {
    name: ProgramCategories.ReadingWriting,
    value: ProgramCategories.ReadingWriting
  },
  {
    name: ProgramCategories.SelfRegulation,
    value: ProgramCategories.SelfRegulation
  },
  { name: ProgramCategories.Skills, value: ProgramCategories.Skills }
];

export const programChainingDirectionsOptions: IOption[] = [
  {
    name: TrialChainingDirections.Forward,
    value: TrialChainingDirections.Forward
  },
  {
    name: TrialChainingDirections.Backward,
    value: TrialChainingDirections.Backward
  }
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

export const trialOptions: IOption[] = [
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

export const physicalPrompts: TargetOption[] = [
  { name: Prompts.FullPhysical, target: true },
  { name: Prompts.PartialPhysical, target: false },
  { name: Prompts.LightPhysical, target: false },
  { name: Prompts.Gesture, target: false },
  { name: Prompts.Independent, target: false }
];

export const verbalPrompts: TargetOption[] = [
  { name: Prompts.FullVerbalModel, target: true },
  { name: Prompts.PartialVerbalModel, target: false },
  { name: Prompts.InitialSoundCue, target: false },
  { name: Prompts.Phonetic, target: false },
  { name: Prompts.Independent, target: false }
];
export const timePrompts: TargetOption[] = [
  { name: Prompts.Immediate, target: true },
  { name: Prompts.TwoSecondDelay, target: false },
  { name: Prompts.FourSecondDelay, target: false },
  { name: Prompts.SixSecondDelay, target: false },
  { name: Prompts.EightSecondDelay, target: false },
  { name: Prompts.TenSecondDelay, target: false }
];

export const promptsByType: Record<PromptTypes, TargetOption[]> = {
  [PromptTypes.Physical]: physicalPrompts,
  [PromptTypes.Verbal]: verbalPrompts,
  [PromptTypes.Time]: timePrompts
};
