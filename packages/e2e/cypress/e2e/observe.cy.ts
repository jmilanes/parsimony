import {
  NavMetaTestIds,
  ProgramPageMetaTestIds,
  ProgramsPageMetaTestIds,
  TestEntryTypes,
  UserPageMetaTestIds
} from "@parsimony/types";

import {
  getButton,
  login,
  selectOption,
  getTableRowAction,
  getTableRowItem
} from "../../utilities";
import { DB_ACTIONS } from "../../utilities/db.utils";
import { API_URL, programWithoutPrompts, ROUTES, user1 } from "../fixtures";

beforeEach(() => {
  login();
});

afterEach(() => {
  DB_ACTIONS.cleanEntities();
});

describe("Observe Tests Page Tests", () => {
  it("should associate program to user from Programs Page", () => {
    DB_ACTIONS.createUserRequest(user1).then((userId) => {
      DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
        cy.visit(`${ROUTES.programs}`);
        getTableRowAction(ProgramsPageMetaTestIds.table, id, "addtoclient")
          .should("exist")
          .click();

        selectOption(ProgramPageMetaTestIds.clientSelector, userId);
        cy.intercept(API_URL).as("save");
        getButton(ProgramPageMetaTestIds.submitEditBtn).click();
        return cy.wait("@save").then((interception) => {
          let targetId = interception.response.body.data.updateProgram.id;
          DB_ACTIONS.addEntity(targetId, TestEntryTypes.PROGRAM);
          cy.visit(`${ROUTES.programs}`);
          getTableRowItem(
            ProgramsPageMetaTestIds.table,
            targetId,
            "title"
          ).should("have.text", "Brushing Teeth_Copy");
        });
      });
    });
  });

  it("should associate program to user from add program button on user page", () => {
    DB_ACTIONS.createUserRequest(user1).then((userId) => {
      DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
        cy.visit(`${ROUTES.directory}/${userId}`);
        getButton(UserPageMetaTestIds.addProgram).click();

        getTableRowAction(ProgramsPageMetaTestIds.table, id, "addtoclient")
          .should("exist")
          .click();

        cy.intercept(API_URL).as("save");
        getButton(ProgramPageMetaTestIds.submitEditBtn).click();
        return cy.wait("@save").then((interception) => {
          let targetId = interception.response.body.data.updateProgram.id;
          DB_ACTIONS.addEntity(targetId, TestEntryTypes.PROGRAM);
          getButton(NavMetaTestIds.programBtn).click();
          getTableRowItem(
            ProgramsPageMetaTestIds.table,
            targetId,
            "title"
          ).should("have.text", "Brushing Teeth_Copy");

          cy.visit(`${ROUTES.directory}/${userId}`);
          getTableRowItem(
            UserPageMetaTestIds.programsTable,
            targetId,
            "title"
          ).should("have.text", "Brushing Teeth_Copy");
        });
      });
    });
  });
});
