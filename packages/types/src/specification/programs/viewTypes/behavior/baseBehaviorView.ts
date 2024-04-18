import { Description, Optional } from "@tsed/schema";
import { BaseProgramView } from "../baseProgramView";

export class BaseBehaviorView extends BaseProgramView {
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
