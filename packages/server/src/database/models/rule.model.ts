import { InputTypes, ProgramValueTypes } from "@parsimony/types";

const RuleOption = {
  name: String,
  target: Boolean
};

export default {
  question: String,
  description: String,
  steps: Number,
  options: [RuleOption],
  required: Boolean,
  inputType: { type: String, enum: InputTypes },
  valueType: { type: String, enum: ProgramValueTypes }
};
