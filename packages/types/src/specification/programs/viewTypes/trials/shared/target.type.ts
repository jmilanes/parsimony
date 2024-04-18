import { InputTypes, ProgramValueTypes } from "../../../program.enums";
import { Description, Optional } from "@tsed/schema";

//TODO Revist all keys and name this better
export class Target {
  @Description("TODO Figure out if this is needed ")
  @Optional()
  currentMasterCount?: number = 0;

  @Description("The descirption fo the target")
  @Optional()
  description?: string = "";

  @Description("UUID from database")
  @Optional()
  id?: string;

  @Description("Type of value for display (prob gonna kill this)")
  @Optional()
  inputType?: InputTypes = InputTypes.Radio;

  @Description("Id of the associated client")
  @Optional()
  mastered?: boolean = false;

  @Description("If the target is required (might always be true (CLEAN UP))")
  @Optional()
  required?: boolean = true;

  @Description("Title of the target")
  @Optional()
  title?: string = "";

  //todo refactor this
  @Description("Type of value for display (prob gonna kill this)")
  @Optional()
  valueType?: ProgramValueTypes = ProgramValueTypes.Number;
}
