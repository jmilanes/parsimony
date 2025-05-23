import { Default, Description, Optional, Required } from "@tsed/schema";
import { Program } from "./progam.type";

export class BaseBcbaProgram extends Program {
  @Description("Boolean for when a client has fully mastered a program")
  @Required()
  @Default(false)
  mastered: boolean = false;

  @Description("Criteria for which the client must pass consecutively")
  @Optional()
  masteryConsecutiveTargets?: number = 1;

  @Description("Target percentage of mastery")
  @Optional()
  masteryTarget?: number = 100;

  @Description("List of materials for the program")
  @Optional()
  materials?: string = "";
}
