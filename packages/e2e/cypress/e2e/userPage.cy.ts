import {
  AddModalControls,
  DirectoryPageMetaTestIds,
  NavMetaTestIds,
  UserPageMetaTestIds
} from "@parsimony/types";

import {
  findText,
  getButton,
  getField,
  getTableAction,
  login
} from "../../utilities";

const removeTableItem = (id) => {
  getTableAction(DirectoryPageMetaTestIds.tableActionDelete, id).click();
  getTableAction(DirectoryPageMetaTestIds.tableActionDelete, id).should(
    "not.exist"
  );
  getTableAction(DirectoryPageMetaTestIds.tableActionView, id).should(
    "not.exist"
  );
};

let cleanUpFunctions = [];

beforeEach(() => {
  login();
  cy.visit("http://localhost:1234/#/directory");
  getButton(DirectoryPageMetaTestIds.addUserBtn).click();
  getField(DirectoryPageMetaTestIds.firstNameField).type("Paul");
  getField(DirectoryPageMetaTestIds.lastNameField).type("Pierce");
  getField(DirectoryPageMetaTestIds.phoneNumberField).type("1111111111");
  getField(DirectoryPageMetaTestIds.emailField).type("paul@parsimony.com");
  getField(DirectoryPageMetaTestIds.passwordField).type("password01");

  cy.intercept("http://localhost:4000/").as("apiRequest");
  getButton(AddModalControls.createBtn).click();
  cy.wait("@apiRequest").then((interception) => {
    let createdId = interception.response.body.data.createUser.id;
    getTableAction(
      DirectoryPageMetaTestIds.tableActionDelete,
      createdId
    ).should("exist");
    getTableAction(DirectoryPageMetaTestIds.tableActionView, createdId).should(
      "exist"
    );
    findText("Paul").should("exist");
    findText("Pierce").should("exist");
    cleanUpFunctions.push(() => removeTableItem(createdId));
    cy.visit(`http://localhost:1234/#/directory/${createdId}`);
  });
});

afterEach(() => {
  cleanUpFunctions.forEach((fn) => fn());
  getButton(NavMetaTestIds.logoutBtn).click();
  cleanUpFunctions = [];
});

describe("User Page Tests", () => {
  it("should edit user to directory", () => {
    getButton(UserPageMetaTestIds.edit).click();
  });
});
