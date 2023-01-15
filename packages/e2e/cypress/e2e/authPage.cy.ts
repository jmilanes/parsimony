import { AuthPageMetaTestIds, NavMetaTestIds } from "@parsimony/types";
import { getButton, getField } from "../../utilities";
import { ROUTES, TEST_USER } from "../fixtures";

describe("Auth Page Tests", () => {
  it("should toggling reset password button", () => {
    cy.visit(ROUTES.home);
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
    cy.visit(ROUTES.home);
    getField(AuthPageMetaTestIds.emailField).type(TEST_USER.email);
    getField(AuthPageMetaTestIds.passwordField).type(TEST_USER.password);
    getButton(AuthPageMetaTestIds.loginBtn).click();
    getButton(NavMetaTestIds.programBtn).should("exist");
  });

  it("should login from program page", () => {
    cy.visit(ROUTES.programs);
    getField(AuthPageMetaTestIds.emailField).type(TEST_USER.email);
    getField(AuthPageMetaTestIds.passwordField).type(TEST_USER.password);
    getButton(AuthPageMetaTestIds.loginBtn).click();
    getButton(NavMetaTestIds.programBtn).should("exist");
    cy.url().should("eq", ROUTES.programs);
  });

  it("should login and then logout", () => {
    cy.visit(ROUTES.programs);
    getField(AuthPageMetaTestIds.emailField).type(TEST_USER.email);
    getField(AuthPageMetaTestIds.passwordField).type(TEST_USER.password);
    getButton(AuthPageMetaTestIds.loginBtn).click();
    getButton(NavMetaTestIds.programBtn).should("exist");
    getButton(NavMetaTestIds.logoutBtn).click();
    getButton(AuthPageMetaTestIds.loginBtn).should("exist");
  });
});
