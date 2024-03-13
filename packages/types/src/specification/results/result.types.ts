import { Description, Optional, Required } from "@tsed/schema";
import { BehaviorType, ResultType } from "./result.enums";
import { TargetResult } from "./targetResult.type";
import { ResultData } from "./resultData.type";

export class BehaviorData {
  @Description("")
  @Optional()
  result?: number;

  @Description("")
  @Optional()
  type?: BehaviorType;
}

@Description("Parsimony Result")
export class Result {
  @Description("This will be refactored in the factory pattern")
  @Optional()
  behaviorData?: BehaviorData;

  @Description("")
  @Optional()
  clientId?: string;

  @Description("")
  @Optional()
  created_at?: Date;

  @Description("")
  @Optional()
  data?: ResultData[];

  @Description("")
  @Required()
  id: string;

  @Description("")
  @Optional()
  notes?: string;

  @Description("")
  @Optional()
  observerId?: string;

  @Description("")
  @Optional()
  programCompleteness?: number;

  @Description("")
  @Optional()
  programId?: string;

  @Description("")
  @Optional()
  result?: number;

  @Description("")
  @Optional()
  type?: ResultType;

  @Description("")
  @Optional()
  updated_at?: Date;
}
