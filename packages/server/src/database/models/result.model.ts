import { ObjectId } from "mongodb";
import { BehaviorType, ResultType } from "@parsimony/types";

const TargetResult = {
  trial: Number,
  option: { name: String },
  targetOptionId: ObjectId,
  completed: Boolean
};

const ResultData = {
  targetId: ObjectId,
  targetCompleteness: Number,
  targetResults: [TargetResult]
};

const BehaviorData = {
  type: { type: String, enum: BehaviorType },
  tally: Number,
  duration: Number,
  intervalPassed: Boolean
};

export default {
  programId: ObjectId,
  clientId: ObjectId,
  type: { type: String, enum: ResultType },
  programCompleteness: Number,
  behaviorData: BehaviorData,
  data: [ResultData]
};
