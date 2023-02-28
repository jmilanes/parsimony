import {
  InputTypes,
  ProgramTypes,
  ProgramValueTypes,
  RuleStyle,
  UserRoles
} from "@parsimony/types";

export const program1 = {
  title: "Brushing Teeth",
  description: "Client needs to brush their teeth",
  writeAccess: [UserRoles.Director],
  readAccess: [UserRoles.Director],
  type: ProgramTypes.Main,
  mastered: false,
  ruleStyle: RuleStyle.Separate,
  rules: [
    {
      question: "Has Client brushed their teeth",
      description: "This is a description",
      steps: 4,
      options: [
        { name: "Full Physical" },
        { name: "Partial physical" },
        {
          name: "Light physical ",
          target: true
        },
        { name: "Gesture" },
        { name: "Independent" }
      ],
      required: true,
      inputType: InputTypes.Radio,
      valueType: ProgramValueTypes.Number
    }
  ]
};

export const programWithoutPrompts = {
  title: "Brushing Teeth",
  description: "Client needs to brush their teeth",
  writeAccess: [UserRoles.Director],
  readAccess: [UserRoles.Director],
  type: ProgramTypes.Main,
  mastered: false,
  ruleStyle: RuleStyle.Separate,
  rules: [
    {
      question: "Has Client brushed their teeth",
      description: "This is a description",
      steps: 4,
      options: [],
      required: true,
      inputType: InputTypes.Radio,
      valueType: ProgramValueTypes.Number
    }
  ]
};

export const program2 = {
  title: "Eat Breakfast",
  description: "Client needs to eat breakfast",
  writeAccess: [UserRoles.Director],
  readAccess: [UserRoles.Director],
  type: ProgramTypes.Main,
  mastered: false,
  ruleStyle: RuleStyle.Separate,
  rules: [
    {
      question: "Eaten Oat Meal",
      description: "This is a description",
      steps: 4,
      options: [
        { name: "Full Physical" },
        { name: "Partial physical" },
        {
          name: "Light physical ",
          target: true
        },
        { name: "Gesture" },
        { name: "Independent" }
      ],
      required: true,
      inputType: InputTypes.Radio,
      valueType: ProgramValueTypes.Number
    },
    {
      question: "Eaten Eggs",
      description: "This is a description",
      steps: 4,
      options: [
        { name: "Full Physical" },
        { name: "Partial physical" },
        {
          name: "Light physical ",
          target: true
        },
        { name: "Gesture" },
        { name: "Independent" }
      ],
      required: true,
      inputType: InputTypes.Radio,
      valueType: ProgramValueTypes.Number
    },
    {
      question: "Eaten Toast",
      description: "This is a description",
      steps: 4,
      options: [
        { name: "Full Physical" },
        { name: "Partial physical" },
        {
          name: "Light physical ",
          target: true
        },
        { name: "Gesture" },
        { name: "Independent" }
      ],
      required: true,
      inputType: InputTypes.Radio,
      valueType: ProgramValueTypes.Number
    }
  ]
};
