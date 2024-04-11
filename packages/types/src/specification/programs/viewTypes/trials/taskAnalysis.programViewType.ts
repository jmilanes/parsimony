import { BaseProgramView } from "../baseProgramView";
import { ProgramViewTypes } from "../../program.enums";
import { Description, Optional } from "@tsed/schema";
import { TargetOption } from "./shared/target.option.type";
import { Target } from "./shared/target.type";
import { Chaining } from "../../program.types";

export class TaskAnalysisProgramViewType extends BaseProgramView {
  type = ProgramViewTypes.TaskAnalysis;

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
