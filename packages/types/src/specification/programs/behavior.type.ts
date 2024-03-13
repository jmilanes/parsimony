import { Default, Description, Optional } from "@tsed/schema";
import { BehaviorType } from "../results";

export class ProgramBehavior {
  @Description("Boolean to determine if program is active")
  @Optional()
  @Default(true)
  active?: Boolean = true;

  @Description("Time used for Interval Type")
  @Optional()
  alertTime?: number;

  @Description("Operational definition content")
  @Optional()
  operationalDefinition?: string;

  @Description("Precursor behaviors content")
  @Optional()
  precursorBehaviors?: string;

  @Description("Proactive strategies content")
  @Optional()
  proactiveStrategies?: string;

  @Description("Reactive strategies content")
  @Optional()
  reactiveStrategies?: string;

  @Description(
    "Type of behavior this will moved to the top level when refactored"
  )
  @Optional()
  type?: BehaviorType;
}
