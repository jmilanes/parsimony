import { Default, Description, Optional, Required } from "@tsed/schema";

import {
  ProgramCategories,
  ProgramTypes,
  ProgramViewTypes,
  TrialChainingDirections
} from "./program.enums";
import { UserRoles } from "../users";

import { ProgramBehavior } from "./behavior.type";
import { Target } from "./viewTypes/trials/shared/target.type";
import { TargetOption } from "./viewTypes/trials/shared/target.option.type";

export class Chaining {
  //TODO REFACTOR
  targetCompleteness?: number;
  type?: TrialChainingDirections;
}

export class OldProgram {
  @Description("Boolean to determine if program is active")
  @Optional()
  @Default(true)
  active?: Boolean = true;

  @Description("Key for behaviors (to be refactored)")
  @Optional()
  @Default(true)
  behavior?: ProgramBehavior = new ProgramBehavior();

  @Description("Category of program")
  @Optional()
  category?: ProgramCategories = ProgramCategories.Aba;

  @Optional()
  chaining?: Chaining = {};

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

  @Description("Description of the program")
  @Optional()
  description?: string;

  @Description("Ids of users who edited the programs")
  @Optional()
  editedBy?: string[];

  @Description("UUID from database")
  @Required()
  id: string;

  @Description("Id of the user who last edited the program")
  @Optional()
  lastEditedBy?: string;

  @Description("Id of main program that was copied to create a client program")
  @Optional()
  mainProgramId?: string;

  @Description("Boolean for when a client has fully mastered a program")
  @Optional()
  @Default(false)
  mastered?: boolean = false;

  @Description("Criteria for which the client must pass consecutively")
  @Optional()
  masteryConsecutiveTargets?: number;

  @Description("Target percentage of mastery")
  @Optional()
  masteryTarget?: number;

  @Description("List of materials for the program")
  @Optional()
  materials?: string;

  @Description("User roles that are allowed to view program")
  @Optional()
  readAccess?: UserRoles[];

  @Description("Ids of users who wish to get updates about programs")
  @Optional()
  subscribers?: string[];

  @Description("Target options for for selection")
  @Optional()
  targetOptions?: TargetOption[];

  @Description("Type of non behavior target (TO REFACTOR)")
  @Optional()
  targetStyle?: ProgramViewTypes;

  @Description("Target Details")
  @Optional()
  targets?: Target[];

  @Description("Title of program")
  @Optional()
  title?: string;

  @Description("Number of times targets must be observed")
  @Optional()
  trials?: number;

  @Description("SAVE type of program")
  @Optional()
  type?: ProgramTypes;

  @Description("Date of last updated")
  @Optional()
  updated_at?: Date;

  @Description("Roles that have access to edit the program")
  @Optional()
  writeAccess?: UserRoles[];
}
