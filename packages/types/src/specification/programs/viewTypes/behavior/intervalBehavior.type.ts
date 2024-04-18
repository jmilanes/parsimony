import { ProgramViewTypes } from "../../program.enums";
import { Description, Optional } from "@tsed/schema";
import { BaseBehaviorView } from "./baseBehaviorView";

export class IntervalBehaviorType extends BaseBehaviorView {
  viewType = ProgramViewTypes.IntervalBehavior;

  @Description("Time used for Interval Type")
  @Optional()
  alertTime?: number = 10000;
}
