import {
  AddModalControls,
  DirectoryPageDataIds,
  NavDataIds
} from "@parsimony/types";

import {
  findText,
  getButton,
  getField,
  getTableAction,
  login
} from "../../utilities";

const removeTableItem = (id) => {
  getTableAction(DirectoryPageDataIds.tableActionDelete, id).click();
  getTableAction(DirectoryPageDataIds.tableActionDelete, id).should(
    "not.exist"
  );
  getTableAction(DirectoryPageDataIds.tableActionView, id).should("not.exist");
};

let cleanUpFunctions = [];

beforeEach(() => {
  login();
});

afterEach(() => {
  cleanUpFunctions.forEach((fn) => fn());
  getButton(NavDataIds.logoutBtn).click();
  cleanUpFunctions = [];
});

describe("Directory Page Tests", () => {
  it("should add user to directory", () => {
    cy.visit("http://localhost:1234/#/directory");
    getButton(DirectoryPageDataIds.addUserBtn).click();
    getField(DirectoryPageDataIds.firstNameField).type("Paul");
    getField(DirectoryPageDataIds.lastNameField).type("Pierce");
    getField(DirectoryPageDataIds.phoneNumberField).type("1111111111");
    getField(DirectoryPageDataIds.emailField).type("paul@parsimony.com");
    getField(DirectoryPageDataIds.passwordField).type("password01");

    cy.intercept("http://localhost:4000/").as("apiRequest");
    getButton(AddModalControls.createBtn).click();
    cy.wait("@apiRequest").then((interception) => {
      let createdId = interception.response.body.data.createUser.id;
      getTableAction(DirectoryPageDataIds.tableActionDelete, createdId).should(
        "exist"
      );
      getTableAction(DirectoryPageDataIds.tableActionView, createdId).should(
        "exist"
      );
      findText("Paul").should("exist");
      findText("Pierce").should("exist");
      cleanUpFunctions.push(() => removeTableItem(createdId));
    });
  });

  it("should add multiple user to directory", () => {
    cy.visit("http://localhost:1234/#/directory");
    getButton(DirectoryPageDataIds.addUserBtn).click();
    getField(DirectoryPageDataIds.firstNameField).type("Paul");
    getField(DirectoryPageDataIds.lastNameField).type("Pierce");
    getField(DirectoryPageDataIds.phoneNumberField).type("1111111111");
    getField(DirectoryPageDataIds.emailField).type("paul@parsimony.com");
    getField(DirectoryPageDataIds.passwordField).type("password01");

    cy.intercept("http://localhost:4000/").as("apiRequest");
    getButton(AddModalControls.createBtn).click();
    cy.wait("@apiRequest").then((interception) => {
      let createdId = interception.response.body.data.createUser.id;
      getTableAction(DirectoryPageDataIds.tableActionDelete, createdId).should(
        "exist"
      );
      getTableAction(DirectoryPageDataIds.tableActionView, createdId).should(
        "exist"
      );
      findText("Paul").should("exist");
      findText("Pierce").should("exist");
      cleanUpFunctions.push(() => removeTableItem(createdId));
    });

    // Add Another User
    getButton(DirectoryPageDataIds.addUserBtn).click();
    getField(DirectoryPageDataIds.firstNameField).type("Kevin");
    getField(DirectoryPageDataIds.lastNameField).type("Garnett");
    getField(DirectoryPageDataIds.phoneNumberField).type("1111111111");
    getField(DirectoryPageDataIds.emailField).type("kg@parsimony.com");
    getField(DirectoryPageDataIds.passwordField).type("password02");

    getButton(AddModalControls.createBtn).click();
    cy.wait("@apiRequest").then((interception) => {
      let createdId = interception.response.body.data.createUser.id;
      getTableAction(DirectoryPageDataIds.tableActionDelete, createdId).should(
        "exist"
      );
      getTableAction(DirectoryPageDataIds.tableActionView, createdId).should(
        "exist"
      );
      findText("Kevin").should("exist");
      findText("Garnett").should("exist");
      cleanUpFunctions.push(() => removeTableItem(createdId));
    });
  });

  it("should got to user if view table action is clicked", () => {
    cy.visit("http://localhost:1234/#/directory");
    getButton(DirectoryPageDataIds.addUserBtn).click();
    getField(DirectoryPageDataIds.firstNameField).type("Paul");
    getField(DirectoryPageDataIds.lastNameField).type("Pierce");
    getField(DirectoryPageDataIds.phoneNumberField).type("1111111111");
    getField(DirectoryPageDataIds.emailField).type("paul@parsimony.com");
    getField(DirectoryPageDataIds.passwordField).type("password01");

    cy.intercept("http://localhost:4000/").as("apiRequest");
    getButton(AddModalControls.createBtn).click();
    cy.wait("@apiRequest").then((interception) => {
      let createdId = interception.response.body.data.createUser.id;
      getTableAction(DirectoryPageDataIds.tableActionDelete, createdId).should(
        "exist"
      );
      getTableAction(DirectoryPageDataIds.tableActionView, createdId).should(
        "exist"
      );
      findText("Paul").should("exist");
      findText("Pierce").should("exist");
      getTableAction(DirectoryPageDataIds.tableActionView, createdId).click();
      cy.url().should("eq", `http://localhost:1234/#/directory/${createdId}`);
      findText("Paul").should("exist");
      findText("Pierce").should("exist");
      findText("First Name").should("exist");
      cy.visit("http://localhost:1234/#/directory");
      cleanUpFunctions.push(() => removeTableItem(createdId));
    });
  });
});
