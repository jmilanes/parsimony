import {
  InputTypes,
  ProgramCategories,
  ProgramTypes,
  ProgramValueTypes,
  TargetStyle,
  TrialChainingDirections,
  UserRoles
} from "@parsimony/types";

export const program1 = {
  title: "Brushing Teeth",
  description: "Client needs to brush their teeth",
  materials: "Toothbrush",
  writeAccess: [UserRoles.Director],
  readAccess: [UserRoles.Director],
  type: ProgramTypes.Main,
  mastered: false,
  targetStyle: TargetStyle.TaskAnalysis,
  trials: 4,
  category: ProgramCategories.Aba,
  targetOptions: [
    { name: "Full Physical", target: false },
    { name: "Partial physical", target: false },
    {
      name: "Light physical ",
      target: true
    },
    { name: "Gesture", target: false },
    { name: "Independent", target: false }
  ],
  targets: [
    {
      title: "Has Client brushed their teeth",
      description: "This is a description",
      required: true,
      inputType: InputTypes.Radio,
      valueType: ProgramValueTypes.Number
    }
  ],
  chainingDirection: TrialChainingDirections.Forward
};

export const programWithoutPrompts = {
  title: "Brushing Teeth",
  description: "Client needs to brush their teeth",
  materials: "Toothbrush",
  writeAccess: [UserRoles.Director],
  readAccess: [UserRoles.Director],
  type: ProgramTypes.Main,
  mastered: false,
  targetStyle: TargetStyle.TaskAnalysis,
  trials: 4,
  category: ProgramCategories.Aba,
  targetOptions: [],
  targets: [
    {
      title: "Has Client brushed their teeth",
      description: "This is a description",
      required: true,
      inputType: InputTypes.Radio,
      valueType: ProgramValueTypes.Number
    }
  ],
  chainingDirection: TrialChainingDirections.Forward
};

export const program2 = {
  title: "Eat Breakfast",
  description: "Client needs to eat breakfast",
  materials: "Spoon",
  writeAccess: [UserRoles.Director],
  readAccess: [UserRoles.Director],
  type: ProgramTypes.Main,
  mastered: false,
  targetStyle: TargetStyle.TaskAnalysis,
  trials: 4,
  category: ProgramCategories.Aba,
  targetOptions: [
    { name: "Full Physical", target: false },
    { name: "Partial physical", target: false },
    {
      name: "Light physical ",
      target: true
    },
    { name: "Gesture", target: false },
    { name: "Independent", target: false }
  ],
  targets: [
    {
      title: "Eaten Oat Meal",
      description: "This is a description",
      required: true,
      inputType: InputTypes.Radio,
      valueType: ProgramValueTypes.Number
    },
    {
      title: "Eaten Eggs",
      description: "This is a description",
      required: true,
      inputType: InputTypes.Radio,
      valueType: ProgramValueTypes.Number
    },
    {
      title: "Eaten Toast",
      description: "This is a description",
      required: true,
      inputType: InputTypes.Radio,
      valueType: ProgramValueTypes.Number
    }
  ]
};

export const programAsClientSeparateStyle = {
  ...program2,
  trials: 2,
  type: ProgramTypes.Client,
  targetStyle: TargetStyle.TaskAnalysis,
  chainingDirection: TrialChainingDirections.Forward
};

export const programAsClientGroupStyle = {
  ...program2,
  trials: 2,
  type: ProgramTypes.Client,
  targetStyle: TargetStyle.DiscreteTrials,
  chainingDirection: TrialChainingDirections.Forward
};
