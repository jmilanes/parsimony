import { Default, Description, Example, Required } from "@tsed/schema";

@Description("Details on each school in parsimony")
export class School {
  @Example("School of Parsimony")
  @Description("The name of a school")
  @Required()
  name: string;

  @Example("ex@gmail.com")
  @Description("The primary email of the account holder")
  @Required()
  primaryEmail: string;

  @Description("A secret for refreshing access token specific to this school ")
  @Required()
  refreshToken: string;

  @Description("A secret for access tokens specific to this school ")
  @Required()
  accessToken: string;

  @Example("driver.db")
  @Description(
    "A part of the connection string to point the correct DB for the school"
  )
  @Required()
  dbConnection: string;

  @Description("Number of seats for clients")
  @Required()
  clientSeats: number;
}
