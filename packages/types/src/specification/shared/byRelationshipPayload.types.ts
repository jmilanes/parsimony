import { Description, Required } from "@tsed/schema";

export class ByRelationshipPayload {
  @Description("UUID from database")
  @Required()
  id: string;

  @Description("Type of data")
  @Required()
  model: string;

  @Description("A property to match in the desired id")
  @Required()
  relationshipProperty: string;
}
