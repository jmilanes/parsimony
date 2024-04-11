import TokenService from "../../../database/token.service";
import { User, UserRoles } from "@parsimony/types";

export const createTokenWithUser =
  (ts: TokenService) =>
  (user: Partial<User> = {}) => {
    return ts.generateAccessToken({
      id: "mockUserId",
      schoolId: "mockSchoolId",
      firstName: "Test",
      lastName: "User",
      phone: "",
      contacts: [],
      clients: [],
      programs: [],
      actionItems: [],
      roles: [UserRoles.Admin],
      type: UserRoles.Admin,
      email: "",
      serviceProvider: "",
      ...user
    });
  };

export const createTestUser = (user: Partial<User>) => {
  const defaults = new User();
  defaults.schoolId = "mockSchoolId";
  return {
    ...defaults,
    ...user
  };
};
