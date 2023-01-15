import { ProgramPageMetaTestIds, UserPageMetaTestIds } from "@parsimony/types";

import { getButton, login } from "../../utilities";
import { DB_ACTIONS } from "../../utilities/db.utils";
import { program1, ROUTES } from "../fixtures";

beforeEach(() => {
  login();
});

afterEach(() => {
  DB_ACTIONS.cleanDb();
});

describe("Program Page Tests", () => {
  it("should edit program", () => {
    DB_ACTIONS.createProgram(program1).then((id) => {
      cy.visit(`${ROUTES.programs}/${id}`);
    });
    getButton(ProgramPageMetaTestIds.editBtn).click();
  });
});
