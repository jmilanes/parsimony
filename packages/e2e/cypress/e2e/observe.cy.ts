import { ProgramPageMetaTestIds, RulesFormMetaTestIds } from "@parsimony/types";

import {
  getButton,
  getField,
  getSelect,
  login,
  readOnlyLocator,
  selectOption,
  findText
} from "../../utilities";
import { DB_ACTIONS } from "../../utilities/db.utils";
import { programWithoutPrompts, ROUTES } from "../fixtures";

beforeEach(() => {
  login();
});

afterEach(() => {
  DB_ACTIONS.cleanEntities();
});

describe("Observe Tests Page Tests", () => {
  it("should basic program editing should work", () => {
    DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
      cy.visit(`${ROUTES.programs}/${id}`);
      getButton(ProgramPageMetaTestIds.editBtn).click();
      getField(ProgramPageMetaTestIds.titleField).type("!!");
      getField(ProgramPageMetaTestIds.descriptionField).type("!!");
      selectOption(ProgramPageMetaTestIds.stepsSelector, "2");
      selectOption(ProgramPageMetaTestIds.readAccessMultiSelector, "CLIENT");
      selectOption(ProgramPageMetaTestIds.writeAccessMultiSelector, "CLIENT");
      getButton(`${RulesFormMetaTestIds.deleteRuleBtn}-0`).click();
      getButton(ProgramPageMetaTestIds.submitEditBtn).click();
      getField(readOnlyLocator(ProgramPageMetaTestIds.titleField)).should(
        "have.text",
        "Brushing Teeth!!"
      );
      getField(readOnlyLocator(ProgramPageMetaTestIds.descriptionField)).should(
        "have.text",
        "Client needs to brush their teeth!!"
      );
      getSelect(
        readOnlyLocator(ProgramPageMetaTestIds.readAccessMultiSelector)
      ).should("have.text", "DIRECTOR, CLIENT");
      getSelect(
        readOnlyLocator(ProgramPageMetaTestIds.writeAccessMultiSelector)
      ).should("have.text", "DIRECTOR, CLIENT");
      getSelect(readOnlyLocator(ProgramPageMetaTestIds.stepsSelector)).should(
        "have.text",
        "2"
      );
      getButton(`${RulesFormMetaTestIds.deleteRuleBtn}-0`).should("not.exist");
    });
  });
});
