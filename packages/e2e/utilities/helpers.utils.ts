import { AuthPageMetaTestIds } from "@parsimony/types";
import { ROUTES } from "../cypress/fixtures";
import { TEST_USER } from "../cypress/fixtures/user.fixtures";
import { getButton, getField } from "../utilities";

export const login = () => {
  cy.visit(ROUTES.home);
  getField(AuthPageMetaTestIds.emailField).type(TEST_USER.email);
  getField(AuthPageMetaTestIds.passwordField).type(TEST_USER.password);
  getButton(AuthPageMetaTestIds.loginBtn).click();
};
