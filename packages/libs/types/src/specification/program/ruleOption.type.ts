import { Default, Description, Required } from "@tsed/schema";

import { ObjectID, Schema } from "@tsed/mongoose";

@Schema()
export class RuleOption {
  @ObjectID("id")
  _id: string;

  @Description("Options name")
  @Required()
  name: string;

  @Description("Desired option to measure against")
  @Required()
  @Default(false)
  target: boolean;
}
