import { Description, Optional, Required } from "@tsed/schema";
import { ProgramViewTypes } from "../program.enums";
import { BaseBcbaProgram } from "../BaseBcbaProgram";

export class BaseProgramView extends BaseBcbaProgram {
  @Description("View Type for a program")
  @Required()
  viewType: ProgramViewTypes = ProgramViewTypes.TaskAnalysis;

  @Description("Title of program")
  @Optional()
  title?: string = "Program Title";

  @Description("Description of the program")
  @Optional()
  description?: string = "Program Description";
}
