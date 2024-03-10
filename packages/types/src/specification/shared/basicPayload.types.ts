import { Description, Required } from "@tsed/schema";

export class BasicPayload {
  @Description("UUID from database")
  @Required()
  id: string;
}
