import { Default, Description, Optional, Required } from "@tsed/schema";

import {
  ProgramCategories,
  ProgramTypes,
  TargetStyle,
  TrialChainingDirections
} from "./program.enums";
import { UserRoles } from "../users";

import { ProgramBehavior } from "./behavior.type";
import { Target } from "./target.type";
import { TargetOption } from "./target.option.type";

export class Chaining {
  //TODO REFACTOR
  targetCompleteness?: number;
  type?: TrialChainingDirections;
}

export class Program {
  @Description("Boolean to determine if program is active")
  @Optional()
  @Default(true)
  active?: Boolean = true;

  @Description("Key for behaviors (to be refactored)")
  @Optional()
  @Default(true)
  behavior?: ProgramBehavior;

  @Description("Category of program")
  @Optional()
  category?: ProgramCategories;

  @Optional()
  chaining?: Chaining;

  @Description("Id of the associated client")
  @Optional()
  clientId?: string;

  @Description("Id of the associated client")
  @Optional()
  collectionId?: string;

  @Description("Id of the associated client")
  @Optional()
  createdBy?: string;

  @Description("Id of the associated client")
  @Optional()
  created_at?: Date;

  @Description("Id of the associated client")
  @Optional()
  description?: string;

  @Description("Id of the associated client")
  @Optional()
  editedBy?: string[];

  @Description("UUID from database")
  @Required()
  id: string;

  @Description("Id of the associated client")
  @Optional()
  lastEditedBy?: string;

  @Description("Id of the associated client")
  @Optional()
  mainProgramId?: string;

  @Description("Id of the associated client")
  @Optional()
  @Default(false)
  mastered?: boolean = false;

  @Description("Id of the associated client")
  @Optional()
  masteryConsecutiveTargets?: number;

  @Description("Id of the associated client")
  @Optional()
  masteryTarget?: number;

  @Description("Id of the associated client")
  @Optional()
  materials?: string;

  @Description("Id of the associated client")
  @Optional()
  readAccess?: UserRoles[];

  @Description("Id of the associated client")
  @Optional()
  subscribers?: string[];

  @Description("Id of the associated client")
  @Optional()
  targetOptions?: TargetOption[];

  @Description("Id of the associated client")
  @Optional()
  targetStyle?: TargetStyle;

  @Description("Id of the associated client")
  @Optional()
  targets?: Target[];

  @Description("Id of the associated client")
  @Optional()
  title?: string;

  @Description("Id of the associated client")
  @Optional()
  trials?: number;

  @Description("Id of the associated client")
  @Optional()
  type?: ProgramTypes;

  @Description("Id of the associated client")
  @Optional()
  updated_at?: Date;

  @Description("Id of the associated client")
  @Optional()
  writeAccess?: UserRoles[];
}
