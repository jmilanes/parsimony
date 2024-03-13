import { createUserPayload } from "../../../testUtils/dataCreation";
import { Domains, UserRoles } from "@parsimony/types";

export const initialUsersPageData = {
  [Domains.User]: [
    createUserPayload({
      firstName: "Tom",
      lastName: "Smith",
      email: "ts@g.com",
      roles: [UserRoles.Director],
      type: UserRoles.Director
    }),
    createUserPayload({
      firstName: "John",
      lastName: "Smith",
      email: "js@g.com",
      roles: [UserRoles.Director],
      type: UserRoles.Director
    })
  ]
};
