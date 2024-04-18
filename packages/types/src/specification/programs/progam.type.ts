import { Default, Description, Optional, Required } from "@tsed/schema";

import { ProgramCategories, ProgramTypes } from "./program.enums";

export class Program {
  @Description("UUID from database")
  @Required()
  id: string;

  @Description("Boolean to determine if program is active")
  @Optional()
  @Default(true)
  active?: Boolean = true;

  @Description("Type of program")
  @Optional()
  type?: ProgramTypes = ProgramTypes.Template;

  @Description("Category of program")
  @Optional()
  category?: ProgramCategories;

  @Description("Id of the associated client")
  @Optional()
  clientId?: string;

  @Description("Id of the associated collection")
  @Optional()
  collectionId?: string;

  @Description("Id of the user who created the program")
  @Optional()
  createdBy?: string;

  @Description("Date the program was created")
  @Optional()
  created_at?: Date;

  @Description("Date of last updated")
  @Optional()
  updated_at?: Date;

  @Description("Ids of users who edited the programs")
  @Optional()
  editedBy?: string[] = [];

  @Description("Id of the user who last edited the program")
  @Optional()
  lastEditedBy?: string;

  @Description(
    "Id of the template program that was copied to create this program"
  )
  @Optional()
  templateId?: string;

  @Description("Ids of users who wish to get updates about programs")
  @Optional()
  subscribers?: string[] = [];
}
