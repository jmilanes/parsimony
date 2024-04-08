import { Default, Description, Optional, Required } from "@tsed/schema";

import { UserRoles } from "./user.enums";

//TODO these could also follow a factory pattern
@Description("Parsimony Users")
export class User {
  @Description("Action item ids associated with this user. For admins")
  @Optional()
  @Default([])
  actionItems?: string[] = [];

  @Description("URL pointing to S3 bucket to an avatar image url")
  @Optional()
  avatar?: string = "";

  @Description("Client ids associated with this user.")
  @Optional()
  @Default([])
  clients?: string[] = [];

  @Description("Contacts for a client")
  @Optional()
  @Default([])
  contacts?: string[] = [];

  @Description("UsersSelected Color")
  @Optional()
  color?: string = "";

  @Description("Date user was created at")
  @Optional()
  created_at?: Date;

  @Description("Users date of birth")
  @Optional()
  dateOfBirth?: Date;

  @Description("A list of document ids")
  @Optional()
  @Default([])
  documents?: string[] = [];

  @Description("User's email address")
  @Optional()
  email?: string = "";

  @Description("User's first name")
  @Optional()
  firstName?: string = "";

  @Description("UUID from database")
  @Required()
  id: string;

  @Description("User's last name")
  @Optional()
  lastName?: string = "";

  @Description("A users encrypted password")
  @Required()
  password?: string = "";

  @Description("User's phone number (only for certain types)")
  @Optional()
  phone?: string = "";

  @Description("A list of program ids associated with client")
  @Optional()
  @Default([])
  programs: string[] = [];

  //TODO Figure out Roles vs type (delete one)
  @Description("Designated Roles of the user")
  @Optional()
  @Default([])
  roles?: UserRoles[] = [];

  @Description("Designated type of the user")
  @Optional()
  @Default(UserRoles.Client)
  type?: UserRoles = UserRoles.Client;

  @Description("School id associating the user with a school")
  @Optional()
  schoolId?: string = "";

  @Description("Service provider id of the client")
  @Optional()
  serviceProvider?: string = "";

  @Description("Service provider id of the client")
  @Optional()
  threadDisplayName?: string = "";

  @Description("Timezone of the user")
  @Optional()
  timezone?: string = "";

  @Description("Date user was last updated")
  @Optional()
  updated_at?: Date;
}
