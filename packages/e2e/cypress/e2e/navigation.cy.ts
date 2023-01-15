import { ChatMetaTestIds, NavMetaTestIds } from "@parsimony/types";
import { getButton, login } from "../../utilities";
import { ROUTES } from "../fixtures";

describe("Navigation Tests", () => {
  it("nav should go to all pages", () => {
    login();
    getButton(NavMetaTestIds.programBtn).should("exist");
    getButton(NavMetaTestIds.homeBtn).should("exist");
    getButton(NavMetaTestIds.schoolBtn).should("exist");
    getButton(NavMetaTestIds.chatBtn).should("exist");
    getButton(NavMetaTestIds.logoutBtn).should("exist");
    getButton(NavMetaTestIds.programBtn).click();
    cy.url().should("eq", ROUTES.programs);
    getButton(NavMetaTestIds.directoryBtn).click();
    cy.url().should("eq", ROUTES.directory);
    getButton(NavMetaTestIds.schoolBtn).click();
    cy.url().should("eq", ROUTES.schools);
    getButton(NavMetaTestIds.homeBtn).click();
    cy.url().should("eq", ROUTES.home);
    getButton(NavMetaTestIds.chatBtn).click();
    getButton(ChatMetaTestIds.createChatBtn).should("exist");
    cy.get(`[aria-label="Close"]`).click();
    getButton(ChatMetaTestIds.createChatBtn).should("not.be.visible");
  });
});
