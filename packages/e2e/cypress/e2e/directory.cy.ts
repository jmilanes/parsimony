import { DirectoryPageMetaTestIds } from "@parsimony/types";

import {
  getTableRowAction,
  getTableRowItem,
  login,
  findText
} from "../../utilities";
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
      getTableRowAction(DirectoryPageMetaTestIds.table, id, "view").should(
        "exist"
      );
      getTableRowAction(DirectoryPageMetaTestIds.table, id, "delete").should(
        "exist"
      );

      getTableRowItem(DirectoryPageMetaTestIds.table, id, "firstName").should(
        "have.text",
        "Paul"
      );
      getTableRowItem(DirectoryPageMetaTestIds.table, id, "lastName").should(
        "have.text",
        "Pierce"
      );
      getTableRowItem(DirectoryPageMetaTestIds.table, id, "type").should(
        "have.text",
        "DIRECTOR"
      );
    });
  });

  it("should add multiple user to directory", () => {
    DB_ACTIONS.createUser(user1).then((id) => {
      getTableRowAction(DirectoryPageMetaTestIds.table, id, "view").should(
        "exist"
      );
      getTableRowAction(DirectoryPageMetaTestIds.table, id, "delete").should(
        "exist"
      );
      getTableRowItem(DirectoryPageMetaTestIds.table, id, "firstName").should(
        "have.text",
        "Paul"
      );
      getTableRowItem(DirectoryPageMetaTestIds.table, id, "lastName").should(
        "have.text",
        "Pierce"
      );
      getTableRowItem(DirectoryPageMetaTestIds.table, id, "type").should(
        "have.text",
        "DIRECTOR"
      );
    });

    DB_ACTIONS.createUser(user2).then((id) => {
      getTableRowAction(DirectoryPageMetaTestIds.table, id, "view").should(
        "exist"
      );
      getTableRowAction(DirectoryPageMetaTestIds.table, id, "delete").should(
        "exist"
      );
      getTableRowItem(DirectoryPageMetaTestIds.table, id, "firstName").should(
        "have.text",
        "Kevin"
      );
      getTableRowItem(DirectoryPageMetaTestIds.table, id, "lastName").should(
        "have.text",
        "Garnett"
      );
      getTableRowItem(DirectoryPageMetaTestIds.table, id, "type").should(
        "have.text",
        "DIRECTOR"
      );
    });
  });

  it("should go to user if view table action is clicked", () => {
    DB_ACTIONS.createUser(user1).then((id) => {
      getTableRowAction(DirectoryPageMetaTestIds.table, id, "view").should(
        "exist"
      );
      getTableRowAction(DirectoryPageMetaTestIds.table, id, "delete").should(
        "exist"
      );

      getTableRowItem(DirectoryPageMetaTestIds.table, id, "firstName").should(
        "have.text",
        "Paul"
      );
      getTableRowItem(DirectoryPageMetaTestIds.table, id, "lastName").should(
        "have.text",
        "Pierce"
      );
      getTableRowItem(DirectoryPageMetaTestIds.table, id, "type").should(
        "have.text",
        "DIRECTOR"
      );

      getTableRowAction(DirectoryPageMetaTestIds.table, id, "view").click();

      cy.url().should("eq", `${ROUTES.directory}/${id}`);
      findText("Paul").should("exist");
      findText("Pierce").should("exist");
      findText("First Name").should("exist");
    });
  });
});
