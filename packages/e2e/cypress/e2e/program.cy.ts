import {
  ProgramPageMetaTestIds,
  Prompts,
  RulesFormMetaTestIds
} from "@parsimony/types";

import {
  getButton,
  getField,
  getSelect,
  login,
  readOnlyLocator,
  selectOption
} from "../../utilities";
import { DB_ACTIONS } from "../../utilities/db.utils";
import { program1, programWithoutPrompts, ROUTES } from "../fixtures";

beforeEach(() => {
  login();
});

afterEach(() => {
  DB_ACTIONS.cleanEntities();
});

describe("Program Page Tests", () => {
  it("should basic program editing should work", () => {
    DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
      cy.visit(`${ROUTES.programs}/${id}`);
      getButton(ProgramPageMetaTestIds.editBtn).click();
      getField(ProgramPageMetaTestIds.titleField).type("!!");
      getField(ProgramPageMetaTestIds.descriptionField).type("!!");
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
      getButton(`${RulesFormMetaTestIds.deleteRuleBtn}-0`).should("not.exist");
    });
  });

  it("should basic program editing cancel should work", () => {
    DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
      cy.visit(`${ROUTES.programs}/${id}`);
      getButton(ProgramPageMetaTestIds.editBtn).click();
      getField(ProgramPageMetaTestIds.titleField).type("!!");
      getField(ProgramPageMetaTestIds.descriptionField).type("!!");
      selectOption(ProgramPageMetaTestIds.readAccessMultiSelector, "CLIENT");
      selectOption(ProgramPageMetaTestIds.writeAccessMultiSelector, "CLIENT");
      getButton(`${RulesFormMetaTestIds.deleteRuleBtn}-0`);
      getButton(ProgramPageMetaTestIds.cancelEditBtn).click();
      getField(readOnlyLocator(ProgramPageMetaTestIds.titleField)).should(
        "have.text",
        "Brushing Teeth"
      );
      getField(readOnlyLocator(ProgramPageMetaTestIds.descriptionField)).should(
        "have.text",
        "Client needs to brush their teeth"
      );
      getSelect(
        readOnlyLocator(ProgramPageMetaTestIds.readAccessMultiSelector)
      ).should("have.text", "DIRECTOR");
      getSelect(
        readOnlyLocator(ProgramPageMetaTestIds.writeAccessMultiSelector)
      ).should("have.text", "DIRECTOR");
      getButton(`${RulesFormMetaTestIds.deleteRuleBtn}-0`).should("exist");
    });
  });

  it("should basic program physical prompt toggles should work", () => {
    DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
      cy.visit(`${ROUTES.programs}/${id}`);
      getButton(ProgramPageMetaTestIds.editBtn).click();
      getButton(
        `${RulesFormMetaTestIds.preSelectedPhysicalPromptsBtn}-0`
      ).click();
      getButton(ProgramPageMetaTestIds.submitEditBtn).click();
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-0`
        )
      ).should("have.text", Prompts.FullPhysical);
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-1`
        )
      ).should("have.text", Prompts.PartialPhysical);
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-2`
        )
      ).should("have.text", Prompts.LightPhysical);
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-3`
        )
      ).should("have.text", Prompts.Gesture);
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-4`
        )
      ).should("have.text", Prompts.Independent);
    });
  });

  it("should basic program physical verbal toggles should work", () => {
    DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
      cy.visit(`${ROUTES.programs}/${id}`);
      getButton(ProgramPageMetaTestIds.editBtn).click();
      getButton(
        `${RulesFormMetaTestIds.preSelectedVerbalPromptsBtn}-0`
      ).click();
      getButton(ProgramPageMetaTestIds.submitEditBtn).click();
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-0`
        )
      ).should("have.text", Prompts.FullVerbalModel);
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-1`
        )
      ).should("have.text", Prompts.PartialVerbalModel);
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-2`
        )
      ).should("have.text", Prompts.InitialSoundCue);
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-3`
        )
      ).should("have.text", Prompts.Phonetic);
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-4`
        )
      ).should("have.text", Prompts.Independent);
    });
  });

  it("should basic program physical time toggles should work", () => {
    DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
      cy.visit(`${ROUTES.programs}/${id}`);
      getButton(ProgramPageMetaTestIds.editBtn).click();
      getButton(`${RulesFormMetaTestIds.preSelectedTimePromptsBtn}-0`).click();
      getButton(ProgramPageMetaTestIds.submitEditBtn).click();
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-0`
        )
      ).should("have.text", Prompts.Immediate);
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-1`
        )
      ).should("have.text", Prompts.TwoSecondDelay);
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-2`
        )
      ).should("have.text", Prompts.FourSecondDelay);
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-3`
        )
      ).should("have.text", Prompts.SixSecondDelay);
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-4`
        )
      ).should("have.text", Prompts.EightSecondDelay);
      getField(
        readOnlyLocator(
          `${RulesFormMetaTestIds.promptNameField}-rule-0-prompt-5`
        )
      ).should("have.text", Prompts.TenSecondDelay);
    });
  });
});
