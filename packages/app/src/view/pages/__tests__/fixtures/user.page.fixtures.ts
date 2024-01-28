import { Domains, UserRoles } from "@parsimony/types/dist";
import { createUserPayload } from "../../../../testUtils/dataCreation";

export const initialUserPageTestData = {
  [Domains.User]: [
    createUserPayload({
      firstName: "Edit",
      lastName: "Me",
      email: "editMe@g.com",
      roles: [UserRoles.Director],
      type: UserRoles.Director
    })
  ]
};
