import {
  DomainOf,
  Default,
  Description,
  Enum,
  Example,
  Max,
  MinLength,
  Optional,
  Required
} from "@tsed/schema";

import { Model, ObjectID } from "@tsed/mongoose";
import { RuleStyle, UserRoles, ProgramTypes } from "../specification.enums";

import { Rule } from "./rule.type";

@Description("Programs are used by BA's to track client behavior")
@Model()
export class Program {
  @Example("63fe9b01c6cc4bd9d4d588e8")
  @Description("A Database Id")
  @Required()
  @ObjectID("id")
  _id: string;

  @Example("Brushing Teeth")
  @Description("Title of Program")
  @Required()
  title: string;

  @Example("Client is must brush their teeth")
  @Description("Description of Program")
  @Optional()
  description: string;

  @Example("63fe9b01c6cc4bd9d4d588e8")
  @Description("The id of the MAIN program which this program was copied from")
  @Required()
  @ObjectID()
  mainProgramId: string;

  @Example("63fe9b01c6cc4bd9d4d588e8")
  @Description("The client id associated with this program")
  @Required()
  @ObjectID()
  clientId: string;

  @Enum(UserRoles)
  @Description("Roles with write access to the program")
  @Default([UserRoles.DIRECTOR])
  @MinLength(1)
  writeAccess: UserRoles[];

  @Enum(UserRoles)
  @Description("Roles with read access to the program")
  @Default([UserRoles.DIRECTOR])
  @MinLength(1)
  readAccess: UserRoles[];

  @Enum(ProgramTypes)
  @Description(`
    Type of program: 
      Main: program meant to be copied for multiple clients 
      Client: program copied from a main program which can be modified for a specific client
  `)
  @Default(ProgramTypes.CLIENT)
  type: ProgramTypes;

  @Description("Number of steps in a program")
  @Required()
  @Default(1)
  @Max(10)
  steps: number;

  @Description("When a client has reached mastery of the program")
  @Required()
  @Default(false)
  mastered: boolean;

  @Example("63fe9b01c6cc4bd9d4d588e8")
  @Description("The id of the last user to edit the program")
  @Required()
  @ObjectID()
  lastEditedBy: string;

  @Example("63fe9b01c6cc4bd9d4d588e8")
  @Description("An array of user ids who have edited the prama")
  @Required()
  @ObjectID()
  editedBy: string[];

  @Example("63fe9b01c6cc4bd9d4d588e8")
  @Description("The id of the user to create the program")
  @Required()
  @ObjectID()
  createdBy: string;

  @Enum(RuleStyle)
  @Description(
    "The rule style specifies the look of the rules upon observation"
  )
  @Default(RuleStyle.GROUP)
  ruleStyle: RuleStyle;

  @DomainOf(Rule)
  @MinLength(1)
  rules: Rule[];
}

const f = (x: Program) => {
  x.ruleStyle = RuleStyle.GROUP;
};
