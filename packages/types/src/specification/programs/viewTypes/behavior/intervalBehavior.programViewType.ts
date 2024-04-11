import { ProgramViewTypes } from "../../program.enums";
import { Description, Optional } from "@tsed/schema";
import { BaseBehaviorView } from "./baseBehaviorView";

export class IntervalBehaviorProgramViewType extends BaseBehaviorView {
  type = ProgramViewTypes.IntervalBehavior;

  @Description("Time used for Interval Type")
  @Optional()
  alertTime?: number = 10000;
}
