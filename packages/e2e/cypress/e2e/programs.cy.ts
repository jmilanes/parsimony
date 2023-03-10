import {
  AddModalControls,
  TestEntryTypes,
  Program,
  ProgramsPageMetaTestIds,
  RulesFormMetaTestIds
} from "@parsimony/types";

import {
  getButton,
  getCheckBox,
  getField,
  getTableRowAction,
  getTableRowItem,
  login,
  selectMultipleOptions,
  selectOption
} from "../../utilities";
import { DB_ACTIONS } from "../../utilities/db.utils";
import { API_URL, program1, program2, ROUTES } from "../fixtures";

const createProgramHelper = (program: Partial<Program>) => {
  cy.visit(ROUTES.programs);
  getButton(ProgramsPageMetaTestIds.addBtn).click();
  getField(ProgramsPageMetaTestIds.titleField).type(program.title);
  getField(ProgramsPageMetaTestIds.descriptionField).type(program.description);

  selectOption(ProgramsPageMetaTestIds.typeSelector, program.type);
  selectOption(
    `${ProgramsPageMetaTestIds.stepsSelector}`,
    program.steps.toString()
  );
  selectOption(ProgramsPageMetaTestIds.ruleStyleSelector, program.ruleStyle);
  selectMultipleOptions(
    ProgramsPageMetaTestIds.readAccessMultiSelector,
    program.readAccess
  );
  selectMultipleOptions(
    ProgramsPageMetaTestIds.writeAccessMultiSelector,
    program.writeAccess
  );

  program.rules.forEach((rule, ruleIndex) => {
    getButton(`${RulesFormMetaTestIds.addRuleBtn}`).click();
    getField(`${RulesFormMetaTestIds.questionField}-${ruleIndex}`).type(
      rule.question
    );

    getField(`${RulesFormMetaTestIds.descriptionField}-${ruleIndex}`).type(
      rule.description
    );
    getCheckBox(
      `${RulesFormMetaTestIds.requiredCheckbox}-${ruleIndex}`
    ).click();
    selectOption(
      `${RulesFormMetaTestIds.inputTypeSelector}-${ruleIndex}`,
      rule.inputType
    );
    selectOption(
      `${RulesFormMetaTestIds.valueTypeSelector}-${ruleIndex}`,
      rule.valueType
    );
    rule.options.forEach((option, optionIndex) => {
      getButton(`${RulesFormMetaTestIds.addPromptBtn}-${ruleIndex}`).click();
      getField(
        `${RulesFormMetaTestIds.promptNameField}-rule-${ruleIndex}-prompt-${optionIndex}`
      ).type(option.name);
      if (option.target) {
        getButton(
          `${RulesFormMetaTestIds.setToTargetBtn}-rule-${ruleIndex}-prompt-${optionIndex}`
        ).click();
      }
    });
  });

  cy.intercept(API_URL).as("apiRequest");
  getButton(AddModalControls.createBtn).click();
  return cy.wait("@apiRequest").then((interception) => {
    let id = interception.response.body.data.createProgram.id;
    DB_ACTIONS.addEntity(id, TestEntryTypes.PROGRAM);
    return id;
  });
};

beforeEach(() => {
  login();
  cy.wait(2000);
});

afterEach(() => {
  DB_ACTIONS.cleanEntities();
});

describe("Programs Page Tests", () => {
  it("should add program to programs", () => {
    createProgramHelper(program1).then((id) => {
      getTableRowAction(ProgramsPageMetaTestIds.table, id, "view").should(
        "exist"
      );
      getTableRowAction(ProgramsPageMetaTestIds.table, id, "delete").should(
        "exist"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "title").should(
        "have.text",
        "Brushing Teeth"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "type").should(
        "have.text",
        "MAIN"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "description").should(
        "have.text",
        "Client needs to brush their teeth"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "rules").should(
        "have.text",
        "1"
      );
    });
  });
  it("should add multiple program to programs", () => {
    createProgramHelper(program1).then((id) => {
      getTableRowAction(ProgramsPageMetaTestIds.table, id, "view").should(
        "exist"
      );
      getTableRowAction(ProgramsPageMetaTestIds.table, id, "delete").should(
        "exist"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "title").should(
        "have.text",
        "Brushing Teeth"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "type").should(
        "have.text",
        "MAIN"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "description").should(
        "have.text",
        "Client needs to brush their teeth"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "rules").should(
        "have.text",
        "1"
      );
    });

    createProgramHelper(program2).then((id) => {
      getTableRowAction(ProgramsPageMetaTestIds.table, id, "view").should(
        "exist"
      );
      getTableRowAction(ProgramsPageMetaTestIds.table, id, "delete").should(
        "exist"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "title").should(
        "have.text",
        "Eat Breakfast"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "type").should(
        "have.text",
        "MAIN"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "description").should(
        "have.text",
        "Client needs to eat breakfast"
      );
      getTableRowItem(ProgramsPageMetaTestIds.table, id, "rules").should(
        "have.text",
        "3"
      );
    });
  });
});
