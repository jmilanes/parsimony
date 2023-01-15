import { Program } from "@parsimony/types/src";

export const program1 = {
  title: "Brushing teeth",
  rules: [
    {
      question: "brushed teeth",
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
      inputType: "RADIO",
      valueType: "NUMBER"
    }
  ],
  description: "whaterver",
  writeAccess: ["DIRECTOR"],
  readAccess: ["DIRECTOR"],
  type: "MAIN",
  mastered: false,
  ruleStyle: "SEPARATE"
};
