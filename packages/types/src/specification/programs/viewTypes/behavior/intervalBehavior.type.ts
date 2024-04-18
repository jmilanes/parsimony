import { ProgramViewTypes } from "../../program.enums";
import { Description, Optional } from "@tsed/schema";
import { BaseBehavior } from "./baseBehaviorView";

export class IntervalBehaviorType extends BaseBehavior {
  viewType = ProgramViewTypes.IntervalBehavior;

  @Description("Time used for Interval Type")
  @Optional()
  alertTime?: number = 10000;
}
