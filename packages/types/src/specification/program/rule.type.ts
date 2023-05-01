import {
  DomainOf,
  Default,
  Description,
  Enum,
  MinLength,
  Optional,
  Required
} from "@tsed/schema";

import { ObjectID, Schema } from "@tsed/mongoose";
import { InputTypes, ProgramValueTypes } from "../specification.enums";
import { RuleOption } from "./ruleOption.type";

@Schema()
export class Rule {
  @ObjectID("id")
  _id: string;

  @Description("Question to track")
  @Required()
  question: string;

  @Description("Description of the Rule")
  @Optional()
  description: string;

  @Description(
    "If a user must complete this rule to submit the program results"
  )
  @Required()
  @Default(true)
  required: Boolean;

  @Description(
    "If a user must complete this rule to submit the program results"
  )
  @DomainOf(RuleOption)
  @MinLength(2)
  rule: RuleOption[];

  @Enum(InputTypes)
  @Description("Type of UI associated with the rule")
  @Default(InputTypes.RADIO)
  inputType: InputTypes;

  @Enum(ProgramValueTypes)
  @Description("Type of data the program is going to store")
  @Default(ProgramValueTypes.NUMBER)
  valueType: ProgramValueTypes;
}
