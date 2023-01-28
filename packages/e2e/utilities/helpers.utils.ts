import { AuthPageMetaTestIds } from "@parsimony/types";
import { API_URL, ROUTES } from "../cypress/fixtures";
import { TEST_USER } from "../cypress/fixtures/user.fixtures";
import { getButton, getField } from "../utilities";
import { DB_ACTIONS } from "./db.utils";

export const login = () => {
  cy.visit(ROUTES.home);
  getField(AuthPageMetaTestIds.emailField).type(TEST_USER.email);
  getField(AuthPageMetaTestIds.passwordField).type(TEST_USER.password);
  cy.intercept(API_URL).as("apiRequestLogin");
  getButton(AuthPageMetaTestIds.loginBtn).click();
  cy.wait("@apiRequestLogin").then((interception) => {
    const accessToke = interception.response.body.data.login.accessToken;
    DB_ACTIONS.setAccessToken(accessToke);
  });
};

export const createTestUser = () => {};
