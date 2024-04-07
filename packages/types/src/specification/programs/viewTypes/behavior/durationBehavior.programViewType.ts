import { BaseProgramView } from "../baseProgramView";
import { ProgramViewTypes } from "../../program.enums";
import { Description, Optional } from "@tsed/schema";
import { TargetOption } from "../trials/shared/target.option.type";
import { Target } from "../trials/shared/target.type";
import { Chaining } from "../../program.types";
import { BaseBehaviorView } from "./baseBehaviorView";

export class DurationBehaviorProgramViewType extends BaseBehaviorView {
  type = ProgramViewTypes.DurationBehavior;
}
