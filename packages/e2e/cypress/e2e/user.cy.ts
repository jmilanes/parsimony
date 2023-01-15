import { UserPageMetaTestIds } from "@parsimony/types";

import { getButton, login } from "../../utilities";
import { DB_ACTIONS } from "../../utilities/db.utils";
import { ROUTES, user1 } from "../fixtures";

beforeEach(() => {
  login();
});

afterEach(() => {
  DB_ACTIONS.cleanDb();
});

describe("User Page Tests", () => {
  it("should edit user", () => {
    DB_ACTIONS.createUser(user1).then((id) => {
      cy.visit(`${ROUTES.directory}/${id}`);
    });
    getButton(UserPageMetaTestIds.edit).click();
  });
});
