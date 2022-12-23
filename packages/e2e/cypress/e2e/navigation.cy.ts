import {
  AuthPageDataIds,
  ChatDataIds,
  NavDataIds,
  TEST_USER
} from "@parsimony/types";
import { getButton, getField } from "../../utilities";

describe("Navigation Tests", () => {
  it("nav should go to all pages", () => {
    cy.visit("http://localhost:1234/#/");
    getField(AuthPageDataIds.emailField).type(TEST_USER.email);
    getField(AuthPageDataIds.passwordField).type(TEST_USER.password);
    getButton(AuthPageDataIds.loginBtn).click();
    getButton(NavDataIds.programBtn).should("exist");
    getButton(NavDataIds.homeBtn).should("exist");
    getButton(NavDataIds.schoolBtn).should("exist");
    getButton(NavDataIds.chatBtn).should("exist");
    getButton(NavDataIds.logoutBtn).should("exist");
    getButton(NavDataIds.programBtn).click();
    cy.url().should("eq", "http://localhost:1234/#/programs");
    getButton(NavDataIds.directoryBtn).click();
    cy.url().should("eq", "http://localhost:1234/#/directory");
    getButton(NavDataIds.schoolBtn).click();
    cy.url().should("eq", "http://localhost:1234/#/school");
    getButton(NavDataIds.homeBtn).click();
    cy.url().should("eq", "http://localhost:1234/#/");
    getButton(NavDataIds.chatBtn).click();
    getButton(ChatDataIds.createChatBtn).should("exist");
    cy.get(`[aria-label="Close"]`).click();
    getButton(ChatDataIds.createChatBtn).should("not.be.visible");
  });
});
