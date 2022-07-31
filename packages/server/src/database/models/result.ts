import { ObjectId } from "mongodb";

const RuleResult = {
  step: Number,
  option: { name: String, value: Number }
};

const ResultData = {
  ruleCompleteness: Number,
  ruleResults: [RuleResult]
};

export default {
  programId: ObjectId,
  clientId: ObjectId,
  programCompleteness: Number,
  data: [ResultData]
};
