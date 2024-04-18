import { Description, Optional } from "@tsed/schema";

import { BaseBcbaProgram } from "../../BaseBcbaProgram";

export class BaseBehavior extends BaseBcbaProgram {
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
}
