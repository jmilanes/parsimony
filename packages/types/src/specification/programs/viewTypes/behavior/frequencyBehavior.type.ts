import { ProgramViewTypes } from "../../program.enums";

import { BaseBcbaProgram } from "../../BaseBcbaProgram";
import { BaseBehavior } from "./baseBehaviorView";

export class FrequencyBehaviorType extends BaseBehavior {
  viewType = ProgramViewTypes.FrequencyBehavior;
}
