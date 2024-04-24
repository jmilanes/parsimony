import { Description, Optional } from "@tsed/schema";

export class BasicPayload {
  @Description("UUID from database")
  @Optional()
  id?: string;
}
