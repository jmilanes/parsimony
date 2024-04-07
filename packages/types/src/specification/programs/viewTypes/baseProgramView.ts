import { Default, Description, Optional, Required } from "@tsed/schema";
import { ProgramViewTypes } from "../program.enums";

export class BaseProgramView {
  @Description("View Type for a program")
  @Required()
  type: ProgramViewTypes;

  @Description("Title of program")
  @Optional()
  title?: string;

  @Description("Description of the program")
  @Optional()
  description?: string;
}
