import { InputTypes, ProgramValueTypes } from "./program.enums";
import { Description, Optional } from "@tsed/schema";

export class Target {
  @Description("Id of the associated client")
  @Optional()
  currentMasterCount?: number;

  @Description("Id of the associated client")
  @Optional()
  description?: string;

  @Description("Id of the associated client")
  @Optional()
  id?: string;

  @Description("Id of the associated client")
  @Optional()
  inputType?: InputTypes;

  @Description("Id of the associated client")
  @Optional()
  mastered?: boolean;

  @Description("Id of the associated client")
  @Optional()
  required?: boolean;

  @Description("Id of the associated client")
  @Optional()
  title?: string;

  //todo refactor this
  @Description("Id of the associated client")
  @Optional()
  valueType?: ProgramValueTypes;
}
