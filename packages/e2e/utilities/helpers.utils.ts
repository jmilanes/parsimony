import { AuthPageDataIds, TEST_USER } from "@parsimony/types";
import { getButton, getField } from "../utilities";

export const login = () => {
  cy.visit("http://localhost:1234/#/");
  getField(AuthPageDataIds.emailField).type(TEST_USER.email);
  getField(AuthPageDataIds.passwordField).type(TEST_USER.password);
  getButton(AuthPageDataIds.loginBtn).click();
};
