import { ObjectId } from "mongodb";

const RuleResult = {
  step: Number,
  option: { name: String },
  targetId: ObjectId,
  completed: Boolean
};

const ResultData = {
  ruleId: ObjectId,
  ruleCompleteness: Number,
  ruleResults: [RuleResult]
};

export default {
  programId: ObjectId,
  clientId: ObjectId,
  programCompleteness: Number,
  data: [ResultData]
};
