import { BaseProgramView } from "../baseProgramView";
import { ProgramViewTypes, TrialChainingDirections } from "../../program.enums";
import { Description, Optional } from "@tsed/schema";
import { TargetOption } from "./shared/target.option.type";
import { Target } from "./shared/target.type";

export class Chaining {
  //TODO REFACTOR
  targetCompleteness?: number;
  type?: TrialChainingDirections;
}

export class TaskAnalysis extends BaseProgramView {
  viewType = ProgramViewTypes.TaskAnalysis;

  @Description("Target options for for selection")
  @Optional()
  targetOptions?: TargetOption[] = [];

  @Description("Number of times targets must be observed")
  @Optional()
  trials?: number = 3;

  @Description("Target Details")
  @Optional()
  targets?: Target[] = [];

  @Description("Details on chaining")
  @Optional()
  chaining?: Chaining = {};
}
