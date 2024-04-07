import { BaseProgramView } from "../baseProgramView";
import { ProgramViewTypes } from "../../program.enums";
import { Description, Optional } from "@tsed/schema";
import { TargetOption } from "../trials/shared/target.option.type";
import { Target } from "../trials/shared/target.type";
import { Chaining } from "../../program.types";
import { BaseBehaviorView } from "./baseBehaviorView";

export class IntervalBehaviorProgramViewType extends BaseBehaviorView {
  type = ProgramViewTypes.IntervalBehavior;

  @Description("Time used for Interval Type")
  @Optional()
  alertTime?: number;
}
