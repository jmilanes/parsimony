import {
  InputTypes,
  Program,
  ProgramTypes,
  ProgramValueTypes,
  TargetStyle,
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
  targetStyle: TargetStyle.Separate,
  trials: 4,
  targets: [
    {
      title: "Has Client brushed their teeth",
      description: "This is a description",
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
  materials: "Toothbrush",
  writeAccess: [UserRoles.Director],
  readAccess: [UserRoles.Director],
  type: ProgramTypes.Main,
  mastered: false,
  targetStyle: TargetStyle.Separate,
  trials: 4,
  targets: [
    {
      title: "Has Client brushed their teeth",
      description: "This is a description",
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
  materials: "Spoon",
  writeAccess: [UserRoles.Director],
  readAccess: [UserRoles.Director],
  type: ProgramTypes.Main,
  mastered: false,
  targetStyle: TargetStyle.Separate,
  trials: 4,
  targets: [
    {
      title: "Eaten Oat Meal",
      description: "This is a description",
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
      title: "Eaten Eggs",
      description: "This is a description",
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
      title: "Eaten Toast",
      description: "This is a description",
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
