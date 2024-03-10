import { Description, Required } from "@tsed/schema";

export class ByRelationshipPayload {
  @Description("UUID from database")
  @Required()
  id: string;

  @Description("A property to match in the desired id")
  @Required()
  relationshipProperty: string;
}
