import {
  AuthPageMetaTestIds,
  ChatMetaTestIds,
  NavMetaTestIds,
  TEST_USER
} from "@parsimony/types";
import { getButton, getField } from "../../utilities";

describe("Navigation Tests", () => {
  it("nav should go to all pages", () => {
    cy.visit("http://localhost:1234/#/");
    getField(AuthPageMetaTestIds.emailField).type(TEST_USER.email);
    getField(AuthPageMetaTestIds.passwordField).type(TEST_USER.password);
    getButton(AuthPageMetaTestIds.loginBtn).click();
    getButton(NavMetaTestIds.programBtn).should("exist");
    getButton(NavMetaTestIds.homeBtn).should("exist");
    getButton(NavMetaTestIds.schoolBtn).should("exist");
    getButton(NavMetaTestIds.chatBtn).should("exist");
    getButton(NavMetaTestIds.logoutBtn).should("exist");
    getButton(NavMetaTestIds.programBtn).click();
    cy.url().should("eq", "http://localhost:1234/#/programs");
    getButton(NavMetaTestIds.directoryBtn).click();
    cy.url().should("eq", "http://localhost:1234/#/directory");
    getButton(NavMetaTestIds.schoolBtn).click();
    cy.url().should("eq", "http://localhost:1234/#/school");
    getButton(NavMetaTestIds.homeBtn).click();
    cy.url().should("eq", "http://localhost:1234/#/");
    getButton(NavMetaTestIds.chatBtn).click();
    getButton(ChatMetaTestIds.createChatBtn).should("exist");
    cy.get(`[aria-label="Close"]`).click();
    getButton(ChatMetaTestIds.createChatBtn).should("not.be.visible");
  });
});
