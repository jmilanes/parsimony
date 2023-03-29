import {
  ProgramCategory,
  ProgramPageMetaTestIds,
  Prompts,
  TargetFormMetaTestIds
} from "@parsimony/types";

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

describe("Program Page Tests", () => {
  it("should basic program editing should work", () => {
    DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
      cy.visit(`${ROUTES.programs}/${id}`);
      getButton(ProgramPageMetaTestIds.editBtn).click();
      getField(ProgramPageMetaTestIds.titleField).type("!!");
      getField(ProgramPageMetaTestIds.descriptionField).type("!!");
      getField(ProgramPageMetaTestIds.materialsField)
        .clear()
        .type("Toothbrush!!!");
      selectOption(ProgramPageMetaTestIds.stepsSelector, "2");
      selectOption(ProgramPageMetaTestIds.readAccessMultiSelector, "CLIENT");
      selectOption(ProgramPageMetaTestIds.writeAccessMultiSelector, "CLIENT");
      selectOption(ProgramPageMetaTestIds.categorySelector, ProgramCategory.Speech);
      getButton(`${TargetFormMetaTestIds.deleteRuleBtn}-0`).click();
      getButton(ProgramPageMetaTestIds.submitEditBtn).click();
      getField(readOnlyLocator(ProgramPageMetaTestIds.titleField)).should(
        "have.text",
        "Brushing Teeth!!"
      );
      getField(readOnlyLocator(ProgramPageMetaTestIds.descriptionField)).should(
        "have.text",
        "Client needs to brush their teeth!!"
      );
      getField(readOnlyLocator(ProgramPageMetaTestIds.materialsField)).should(
        "have.text",
        "Toothbrush!!!"
      );
      getSelect(
        readOnlyLocator(ProgramPageMetaTestIds.categorySelector)
      ).should("have.text", ProgramCategory.Speech);
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
      getButton(`${TargetFormMetaTestIds.deleteRuleBtn}-0`).should("not.exist");
    });
  });

  it("should basic program editing cancel should work", () => {
    DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
      cy.visit(`${ROUTES.programs}/${id}`);
      getButton(ProgramPageMetaTestIds.editBtn).click();
      getField(ProgramPageMetaTestIds.titleField).type("!!");
      getField(ProgramPageMetaTestIds.materialsField).type("Fork");
      getField(ProgramPageMetaTestIds.descriptionField).type("!!");
      selectOption(ProgramPageMetaTestIds.stepsSelector, "2");
      selectOption(ProgramPageMetaTestIds.categorySelector, ProgramCategory.Speech);
      selectOption(ProgramPageMetaTestIds.readAccessMultiSelector, "CLIENT");
      selectOption(ProgramPageMetaTestIds.writeAccessMultiSelector, "CLIENT");
      getButton(`${TargetFormMetaTestIds.deleteRuleBtn}-0`);
      getButton(ProgramPageMetaTestIds.cancelEditBtn).click();
      getField(readOnlyLocator(ProgramPageMetaTestIds.titleField)).should(
        "have.text",
        "Brushing Teeth"
      );
      getField(readOnlyLocator(ProgramPageMetaTestIds.descriptionField)).should(
        "have.text",
        "Client needs to brush their teeth"
      );
      getField(readOnlyLocator(ProgramPageMetaTestIds.materialsField)).should(
        "have.text",
        "Toothbrush"
      );
      getSelect(
        readOnlyLocator(ProgramPageMetaTestIds.categorySelector)
      ).should("have.text", ProgramCategory.Behavior);
      getSelect(
        readOnlyLocator(ProgramPageMetaTestIds.readAccessMultiSelector)
      ).should("have.text", "DIRECTOR");
      getSelect(
        readOnlyLocator(ProgramPageMetaTestIds.writeAccessMultiSelector)
      ).should("have.text", "DIRECTOR");
      getSelect(readOnlyLocator(ProgramPageMetaTestIds.stepsSelector)).should(
        "have.text",
        "4"
      );
      getButton(`${TargetFormMetaTestIds.deleteRuleBtn}-0`).should("exist");
    });
  });

  it("should basic program physical prompt toggles should work", () => {
    DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
      cy.visit(`${ROUTES.programs}/${id}`);
      getButton(ProgramPageMetaTestIds.editBtn).click();
      getButton(TargetFormMetaTestIds.preSelectedPhysicalPromptsBtn
      ).click();
      getButton(ProgramPageMetaTestIds.submitEditBtn).click();
      findText("Target Prompt");
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-0`
        )
      ).should("have.text", Prompts.FullPhysical);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-1`
        )
      ).should("have.text", Prompts.PartialPhysical);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-2`
        )
      ).should("have.text", Prompts.LightPhysical);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-3`
        )
      ).should("have.text", Prompts.Gesture);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-4`
        )
      ).should("have.text", Prompts.Independent);
    });
  });

  it("should basic program physical verbal toggles should work", () => {
    DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
      cy.visit(`${ROUTES.programs}/${id}`);
      getButton(ProgramPageMetaTestIds.editBtn).click();
      getButton(
        TargetFormMetaTestIds.preSelectedVerbalPromptsBtn
      ).click();
      getButton(ProgramPageMetaTestIds.submitEditBtn).click();
      findText("Target Prompt");
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-0`
        )
      ).should("have.text", Prompts.FullVerbalModel);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-1`
        )
      ).should("have.text", Prompts.PartialVerbalModel);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-2`
        )
      ).should("have.text", Prompts.InitialSoundCue);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-3`
        )
      ).should("have.text", Prompts.Phonetic);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-4`
        )
      ).should("have.text", Prompts.Independent);
    });
  });

  it("should basic program physical time toggles should work", () => {
    DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
      cy.visit(`${ROUTES.programs}/${id}`);
      getButton(ProgramPageMetaTestIds.editBtn).click();
      getButton(TargetFormMetaTestIds.preSelectedTimePromptsBtn).click();
      getButton(ProgramPageMetaTestIds.submitEditBtn).click();
      findText("Target Prompt");
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-0`
        )
      ).should("have.text", Prompts.Immediate);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-1`
        )
      ).should("have.text", Prompts.TwoSecondDelay);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-2`
        )
      ).should("have.text", Prompts.FourSecondDelay);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-3`
        )
      ).should("have.text", Prompts.SixSecondDelay);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-4`
        )
      ).should("have.text", Prompts.EightSecondDelay);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-5`
        )
      ).should("have.text", Prompts.TenSecondDelay);
    });
  });

  it("should delete a prompt", () => {
    DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
      cy.visit(`${ROUTES.programs}/${id}`);
      getButton(ProgramPageMetaTestIds.editBtn).click();
      getButton(TargetFormMetaTestIds.preSelectedTimePromptsBtn).click();
      findText("Target Prompt");
      getButton(
        `${TargetFormMetaTestIds.deletePromptBtn}-target-option-1`
      ).click();
      getButton(ProgramPageMetaTestIds.submitEditBtn).click();
      findText(Prompts.TwoSecondDelay).should("not.exist");
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-0`
        )
      ).should("have.text", Prompts.Immediate);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-1`
        )
      ).should("have.text", Prompts.FourSecondDelay);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-2`
        )
      ).should("have.text", Prompts.SixSecondDelay);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-3`
        )
      ).should("have.text", Prompts.EightSecondDelay);
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-4`
        )
      ).should("have.text", Prompts.TenSecondDelay);
    });
  });

  it("should add first prompt with target key", () => {
    DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
      cy.visit(`${ROUTES.programs}/${id}`);
      getButton(ProgramPageMetaTestIds.editBtn).click();
      getButton(TargetFormMetaTestIds.addPromptBtn).click();
      getField(`${TargetFormMetaTestIds.promptNameField}-target-option-0`).type(
        "Prompt 1"
      );
      getButton(TargetFormMetaTestIds.addPromptBtn).click();
      getField(`${TargetFormMetaTestIds.promptNameField}-target-option-1`).type(
        "Prompt 2"
      );
      findText("Target Prompt");
      getButton(ProgramPageMetaTestIds.submitEditBtn).click();
      findText(Prompts.TwoSecondDelay).should("not.exist");
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-0`
        )
      ).should("have.text", "Prompt 1");
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-1`
        )
      ).should("have.text", "Prompt 2");
    });
  });

  it("should not allow you to delete the target prompt", () => {
    DB_ACTIONS.createProgramRequest(programWithoutPrompts).then((id) => {
      cy.visit(`${ROUTES.programs}/${id}`);
      getButton(ProgramPageMetaTestIds.editBtn).click();
      getButton(TargetFormMetaTestIds.addPromptBtn).click();
      getField(`${TargetFormMetaTestIds.promptNameField}-target-option-0`).type(
        "Prompt 1"
      );
      getButton(TargetFormMetaTestIds.addPromptBtn).click();
      getField(`${TargetFormMetaTestIds.promptNameField}-target-option-1`).type(
        "Prompt 2"
      );
      findText("Target Prompt");
      getButton(
        `${TargetFormMetaTestIds.deletePromptBtn}-target-option-0`
      ).click();
      findText("You can't delete the target program!");
      getButton(ProgramPageMetaTestIds.submitEditBtn).click();
      findText(Prompts.TwoSecondDelay).should("not.exist");
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-0`
        )
      ).should("have.text", "Prompt 1");
      getField(
        readOnlyLocator(
          `${TargetFormMetaTestIds.promptNameField}-target-option-1`
        )
      ).should("have.text", "Prompt 2");
    });
  });
});
