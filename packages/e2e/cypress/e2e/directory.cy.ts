import {
  AddModalControls,
  TestEntryTypes,
  DirectoryPageMetaTestIds,
  User
} from "@parsimony/types";

import {
  getTableRowAction,
  getTableRowItem,
  login,
  findText,
  getButton,
  getField
} from "../../utilities";
import { DB_ACTIONS } from "../../utilities/db.utils";
import { API_URL, ROUTES, user1, user2 } from "../fixtures";

const createUserHelper = (user: Partial<User>) => {
  cy.visit(ROUTES.directory);
  getButton(DirectoryPageMetaTestIds.addUserBtn).click();
  getField(DirectoryPageMetaTestIds.firstNameField).type(user.firstName);
  getField(DirectoryPageMetaTestIds.lastNameField).type(user.lastName);
  getField(DirectoryPageMetaTestIds.phoneNumberField).type(user.phone);
  getField(DirectoryPageMetaTestIds.emailField).type(user.email);
  getField(DirectoryPageMetaTestIds.passwordField).type(user.password);

  cy.intercept(API_URL).as("apiRequest");
  getButton(AddModalControls.createBtn).click();
  return cy.wait("@apiRequest").then((interception) => {
    let id = interception.response.body.data.createUser.id;
    DB_ACTIONS.addEntity(id, TestEntryTypes.DIRECTORY);
    return id;
  });
};

beforeEach(() => {
  login();
});

afterEach(async () => {
  await DB_ACTIONS.cleanEntities();
});

describe("Directory Page Tests", () => {
  it("should add user to directory", () => {
    createUserHelper(user1).then((id) => {
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
    createUserHelper(user1).then((id) => {
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

    createUserHelper(user2).then((id) => {
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
    createUserHelper(user1).then((id) => {
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
