import { Description, Optional, Required } from "@tsed/schema";
import { ProgramViewTypes } from "../program.enums";

export class BaseProgramView {
  @Description("View Type for a program")
  @Required()
  type: ProgramViewTypes = ProgramViewTypes.TaskAnalysis;

  @Description("Title of program")
  @Optional()
  title?: string = "Program Title";

  @Description("Description of the program")
  @Optional()
  description?: string = "Program Description";
}
