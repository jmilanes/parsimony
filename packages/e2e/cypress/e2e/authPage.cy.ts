import { AuthPageDataIds, NavDataIds, TEST_USER } from "@parsimony/types";
import { getButton, getField } from "../../utilities";

describe("Auth Page Tests", () => {
  it("should toggling reset password button", () => {
    cy.visit("http://localhost:1234/#/");

    getButton(AuthPageDataIds.loginBtn).should("exist");
    getButton(AuthPageDataIds.resetBtn).should("not.exist");
    getButton(AuthPageDataIds.cancelBtn).should("not.exist");
    getButton(AuthPageDataIds.resetPasswordBtn).should("exist");

    getButton(AuthPageDataIds.resetPasswordBtn).click();

    getButton(AuthPageDataIds.loginBtn).should("not.exist");
    getButton(AuthPageDataIds.resetBtn).should("exist");
    getButton(AuthPageDataIds.cancelBtn).should("exist");
    getButton(AuthPageDataIds.resetPasswordBtn).should("not.exist");

    getButton(AuthPageDataIds.cancelBtn).click();

    getButton(AuthPageDataIds.loginBtn).should("exist");
    getButton(AuthPageDataIds.resetBtn).should("not.exist");
    getButton(AuthPageDataIds.cancelBtn).should("not.exist");
    getButton(AuthPageDataIds.resetPasswordBtn).should("exist");
  });

  it("should login", () => {
    cy.visit("http://localhost:1234/#/");
    getField(AuthPageDataIds.emailField).type(TEST_USER.email);
    getField(AuthPageDataIds.passwordField).type(TEST_USER.password);
    getButton(AuthPageDataIds.loginBtn).click();
    getButton(NavDataIds.programBtn).should("exist");
  });

  it("should login from program page", () => {
    cy.visit("http://localhost:1234/#/programs");
    getField(AuthPageDataIds.emailField).type(TEST_USER.email);
    getField(AuthPageDataIds.passwordField).type(TEST_USER.password);
    getButton(AuthPageDataIds.loginBtn).click();
    getButton(NavDataIds.programBtn).should("exist");
    cy.url().should("eq", "http://localhost:1234/#/programs");
  });

  it("should login and then logout", () => {
    cy.visit("http://localhost:1234/#/programs");
    getField(AuthPageDataIds.emailField).type(TEST_USER.email);
    getField(AuthPageDataIds.passwordField).type(TEST_USER.password);
    getButton(AuthPageDataIds.loginBtn).click();
    getButton(NavDataIds.programBtn).should("exist");
    getButton(NavDataIds.logoutBtn).click();
    getButton(AuthPageDataIds.loginBtn).should("exist");
  });
});
