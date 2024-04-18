import { ProgramViewTypes } from "../../program.enums";
import { Description, Optional } from "@tsed/schema";

import { BaseBcbaProgram } from "../../BaseBcbaProgram";

export class IntervalBehaviorType extends BaseBcbaProgram {
  viewType = ProgramViewTypes.IntervalBehavior;

  @Description("Time used for Interval Type")
  @Optional()
  alertTime?: number = 10000;
}
