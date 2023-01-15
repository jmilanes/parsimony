import { DirectoryPageMetaTestIds } from "@parsimony/types";

import { findText, getTableAction, login } from "../../utilities";
import { DB_ACTIONS } from "../../utilities/db.utils";
import { ROUTES, user1, user2 } from "../fixtures";

beforeEach(() => {
  login();
});

afterEach(() => {
  DB_ACTIONS.cleanDb();
});

describe("Directory Page Tests", () => {
  it("should add user to directory", () => {
    DB_ACTIONS.createUser(user1).then((id) => {
      getTableAction(DirectoryPageMetaTestIds.tableActionDelete, id).should(
        "exist"
      );
      getTableAction(DirectoryPageMetaTestIds.tableActionView, id).should(
        "exist"
      );
      findText("Paul").should("exist");
      findText("Pierce").should("exist");
    });
  });

  it("should add multiple user to directory", () => {
    DB_ACTIONS.createUser(user1).then((id) => {
      getTableAction(DirectoryPageMetaTestIds.tableActionDelete, id).should(
        "exist"
      );
      getTableAction(DirectoryPageMetaTestIds.tableActionView, id).should(
        "exist"
      );
      findText("Paul").should("exist");
      findText("Pierce").should("exist");
    });

    DB_ACTIONS.createUser(user2).then((id) => {
      getTableAction(DirectoryPageMetaTestIds.tableActionDelete, id).should(
        "exist"
      );
      getTableAction(DirectoryPageMetaTestIds.tableActionView, id).should(
        "exist"
      );
      findText("Kevin").should("exist");
      findText("Garnett").should("exist");
    });
  });

  it("should go to user if view table action is clicked", () => {
    DB_ACTIONS.createUser(user1).then((id) => {
      getTableAction(DirectoryPageMetaTestIds.tableActionDelete, id).should(
        "exist"
      );
      getTableAction(DirectoryPageMetaTestIds.tableActionView, id).should(
        "exist"
      );
      findText("Paul").should("exist");
      findText("Pierce").should("exist");
      getTableAction(DirectoryPageMetaTestIds.tableActionView, id).click();

      cy.url().should("eq", `${ROUTES.directory}/${id}`);
      findText("Paul").should("exist");
      findText("Pierce").should("exist");
      findText("First Name").should("exist");
    });
  });
});
