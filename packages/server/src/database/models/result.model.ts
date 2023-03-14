import { ObjectId } from "mongodb";

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

export default {
  programId: ObjectId,
  clientId: ObjectId,
  programCompleteness: Number,
  data: [ResultData]
};
