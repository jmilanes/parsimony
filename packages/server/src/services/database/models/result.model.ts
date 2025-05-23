import { ObjectId } from "mongodb";
import { ResultType } from "@parsimony/types";

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
  observerId: ObjectId,
  type: { type: String, enum: ResultType },
  programCompleteness: Number,
  data: [ResultData],
  notes: String,
  result: Number,
  updated_at: Date,
  created_at: Date
};
