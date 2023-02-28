import { AuthPageMetaTestIds, NavMetaTestIds } from "@parsimony/types";
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
    const accessToken = interception.response.body.data.login.accessToken;
    DB_ACTIONS.setAccessToken(accessToken);
  });
};

export const loginUser = (email: string, password: string) => {
  cy.visit(ROUTES.home);
  getField(AuthPageMetaTestIds.emailField).type(email);
  getField(AuthPageMetaTestIds.passwordField).type(password);
  cy.intercept(API_URL).as("apiRequestLogin");
  getButton(AuthPageMetaTestIds.loginBtn).click();
  cy.wait("@apiRequestLogin").then((interception) => {
    const accessToken = interception.response.body.data.me.accessToken;
    DB_ACTIONS.setAccessToken(accessToken);
  });
};

export const logOut = () => {
  cy.visit(ROUTES.home);
  getButton(NavMetaTestIds.logoutBtn).click();
  DB_ACTIONS.setAccessToken(null);
};
