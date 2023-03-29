import {
  NavMetaTestIds,
  ObservationMetaTestIds,
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
  getTableRowItem,
  getTargetOptionButton,
  getSeparateObserveButton, getField, readOnlyLocator
} from "../../utilities";
import { DB_ACTIONS } from "../../utilities/db.utils";
import {
  API_URL,
  programAsClientGroupStyle,
  programAsClientSeparateStyle,
  programWithoutPrompts,
  ROUTES,
  user1
} from "../fixtures";

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
          cy.visit(`${ROUTES.programs}/${targetId}`);
          getField(readOnlyLocator(ProgramPageMetaTestIds.titleField)).should("have.text", "Brushing Teeth_Copy");
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
          cy.visit(`${ROUTES.programs}/${targetId}`);
          getField(readOnlyLocator(ProgramPageMetaTestIds.titleField)).should("have.text", "Brushing Teeth_Copy");
          getButton(NavMetaTestIds.directoryBtn).click();
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

  it("should run a group program", () => {
    DB_ACTIONS.createUserRequest(user1).then((userId) => {
      DB_ACTIONS.createProgramRequest({
        ...programAsClientGroupStyle,
        clientId: userId
      }).then((id) => {
        cy.visit(`${ROUTES.directory}/${userId}`);
        getTableRowAction(
          UserPageMetaTestIds.programsTable,
          id,
          "startobserving"
        ).click();
      });
      getButton(ObservationMetaTestIds.selectGroupedRuleBtn).click();
      getTargetOptionButton(0, 4).click();
      getTargetOptionButton(1, 4).click();
      getTargetOptionButton(2, 4).click();
      getButton(ObservationMetaTestIds.nextRuleBtn).click();
      getTargetOptionButton(0, 4).click();
      getTargetOptionButton(1, 4).click();
      getTargetOptionButton(2, 4).click();
      getButton(ObservationMetaTestIds.nextRuleBtn).click();
      getButton(ObservationMetaTestIds.submitObservation).click();
      getButton(ObservationMetaTestIds.viewResultsBtn).click();
      cy.get(`[data-test-id="chart"`).should("exist");
    });
  });

  it("should run a separate program", () => {
    DB_ACTIONS.createUserRequest(user1).then((userId) => {
      DB_ACTIONS.createProgramRequest({
        ...programAsClientSeparateStyle,
        clientId: userId
      }).then((id) => {
        cy.visit(`${ROUTES.directory}/${userId}`);
        getTableRowAction(
          UserPageMetaTestIds.programsTable,
          id,
          "startobserving"
        ).click();
      });
      getSeparateObserveButton(0).click();
      getTargetOptionButton(0, 4).click();
      getTargetOptionButton(0, 4).click();

      getSeparateObserveButton(1).click();
      getTargetOptionButton(1, 4).click();
      getTargetOptionButton(1, 4).click();

      getSeparateObserveButton(2).click();
      getTargetOptionButton(2, 4).click();
      getTargetOptionButton(2, 4).click();

      getButton(ObservationMetaTestIds.submitObservation).click();
      getButton(ObservationMetaTestIds.viewResultsBtn).click();
      cy.get(`[data-test-id="chart"`).should("exist");
    });
  });
});
