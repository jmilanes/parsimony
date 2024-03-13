import { Description, Optional } from "@tsed/schema";

export class TargetOption {
  @Description("UUID from database")
  @Optional()
  id?: string;

  @Description("Target option name")
  @Optional()
  name?: string;

  @Description("Indicates if option is the target")
  @Optional()
  target?: boolean;
}
