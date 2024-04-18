import { ProgramViewTypes } from "../../program.enums";
import { Description, Optional } from "@tsed/schema";
import { TargetOption } from "./shared/target.option.type";
import { Target } from "./shared/target.type";
import { BaseBcbaProgram } from "../../BaseBcbaProgram";

export class DiscreteTrialsType extends BaseBcbaProgram {
  viewType = ProgramViewTypes.DiscreteTrials;

  @Description("Target options for for selection")
  @Optional()
  targetOptions?: TargetOption[] = [];

  @Description("Number of times targets must be observed")
  @Optional()
  trials?: number = 3;

  @Description("Target Details")
  @Optional()
  targets?: Target[] = [];
}
