import TokenService from "../../services/database/token.service";
import {
  BaseBcbaProgram,
  Collection,
  Program,
  Result,
  User,
  UserRoles
} from "@parsimony/types";
import { DeepPartial } from "utility-types";
import { merge } from "lodash";

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

export type CreatTestEntity<T> = (override: T) => T;

export const createTestUser = (overrides?: Partial<User>) => {
  const defaults = new User();
  defaults.schoolId = "mockSchoolId";
  return {
    ...defaults,
    ...overrides
  };
};

export const createTestResult = (overrides?: Partial<Result>) => {
  const defaults = new Result();
  return {
    ...defaults,
    ...overrides
  };
};

export const createTestCollection = (overrides?: Partial<Collection>) => {
  const defaults = new Collection();
  return {
    ...defaults,
    ...overrides
  };
};

export const createTestProgram = <P extends BaseBcbaProgram>(
  def: any,
  overrides?: DeepPartial<P>
) => {
  const defaults = new def();
  return merge(defaults, overrides);
};
