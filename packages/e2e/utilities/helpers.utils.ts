import { AuthPageMetaTestIds, TEST_USER } from "@parsimony/types";
import { getButton, getField } from "../utilities";

export const login = () => {
  cy.visit("http://localhost:1234/#/");
  getField(AuthPageMetaTestIds.emailField).type(TEST_USER.email);
  getField(AuthPageMetaTestIds.passwordField).type(TEST_USER.password);
  getButton(AuthPageMetaTestIds.loginBtn).click();
};
