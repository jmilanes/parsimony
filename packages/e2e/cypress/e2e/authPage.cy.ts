import {
  AuthPageMetaTestIds,
  NavMetaTestIds,
  TEST_USER
} from "@parsimony/types";
import { getButton, getField } from "../../utilities";

describe("Auth Page Tests", () => {
  it("should toggling reset password button", () => {
    cy.visit("http://localhost:1234/#/");

    getButton(AuthPageMetaTestIds.loginBtn).should("exist");
    getButton(AuthPageMetaTestIds.resetBtn).should("not.exist");
    getButton(AuthPageMetaTestIds.cancelBtn).should("not.exist");
    getButton(AuthPageMetaTestIds.resetPasswordBtn).should("exist");

    getButton(AuthPageMetaTestIds.resetPasswordBtn).click();

    getButton(AuthPageMetaTestIds.loginBtn).should("not.exist");
    getButton(AuthPageMetaTestIds.resetBtn).should("exist");
    getButton(AuthPageMetaTestIds.cancelBtn).should("exist");
    getButton(AuthPageMetaTestIds.resetPasswordBtn).should("not.exist");

    getButton(AuthPageMetaTestIds.cancelBtn).click();

    getButton(AuthPageMetaTestIds.loginBtn).should("exist");
    getButton(AuthPageMetaTestIds.resetBtn).should("not.exist");
    getButton(AuthPageMetaTestIds.cancelBtn).should("not.exist");
    getButton(AuthPageMetaTestIds.resetPasswordBtn).should("exist");
  });

  it("should login", () => {
    cy.visit("http://localhost:1234/#/");
    getField(AuthPageMetaTestIds.emailField).type(TEST_USER.email);
    getField(AuthPageMetaTestIds.passwordField).type(TEST_USER.password);
    getButton(AuthPageMetaTestIds.loginBtn).click();
    getButton(NavMetaTestIds.programBtn).should("exist");
  });

  it("should login from program page", () => {
    cy.visit("http://localhost:1234/#/programs");
    getField(AuthPageMetaTestIds.emailField).type(TEST_USER.email);
    getField(AuthPageMetaTestIds.passwordField).type(TEST_USER.password);
    getButton(AuthPageMetaTestIds.loginBtn).click();
    getButton(NavMetaTestIds.programBtn).should("exist");
    cy.url().should("eq", "http://localhost:1234/#/programs");
  });

  it("should login and then logout", () => {
    cy.visit("http://localhost:1234/#/programs");
    getField(AuthPageMetaTestIds.emailField).type(TEST_USER.email);
    getField(AuthPageMetaTestIds.passwordField).type(TEST_USER.password);
    getButton(AuthPageMetaTestIds.loginBtn).click();
    getButton(NavMetaTestIds.programBtn).should("exist");
    getButton(NavMetaTestIds.logoutBtn).click();
    getButton(AuthPageMetaTestIds.loginBtn).should("exist");
  });
});
