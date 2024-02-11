import {
  AddModalControls,
  TestEntryTypes,
  Program,
  CollectionPageMetaTestIds,
  TargetFormMetaTestIds
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
  getButton(CollectionPageMetaTestIds.addProgramBtn).click();
  getField(CollectionPageMetaTestIds.addProgramFormTitleField).type(
    program.title
  );
  getField(CollectionPageMetaTestIds.addProgramFormDescriptionField).type(
    program.description
  );
  getField(CollectionPageMetaTestIds.addProgramFormFormMaterialsField).type(
    program.materials
  );
  selectOption(
    CollectionPageMetaTestIds.addProgramFormTypeSelector,
    program.type
  );
  selectOption(
    `${CollectionPageMetaTestIds.addProgramFormStepsSelector}`,
    program.trials.toString()
  );
  selectOption(
    CollectionPageMetaTestIds.addProgramFormTargetStyleSelector,
    program.targetStyle
  );
  selectOption(
    CollectionPageMetaTestIds.addProgramFormCategorySelector,
    program.category
  );
  selectMultipleOptions(
    CollectionPageMetaTestIds.readAccessMultiSelector,
    program.readAccess
  );
  selectMultipleOptions(
    CollectionPageMetaTestIds.writeAccessMultiSelector,
    program.writeAccess
  );

  program?.targetOptions?.forEach((option, optionIndex) => {
    getButton(`${TargetFormMetaTestIds.addPromptBtn}`).click();
    getField(
      `${TargetFormMetaTestIds.promptNameField}-target-option-${optionIndex}`
    ).type(option.name);
    if (option.target) {
      getButton(
        `${TargetFormMetaTestIds.setToTargetBtn}-target-option-${optionIndex}`
      ).click();
    }
  });

  program.targets.forEach((target, ruleIndex) => {
    getButton(`${TargetFormMetaTestIds.addRuleBtn}`).click();
    getField(`${TargetFormMetaTestIds.questionField}-${ruleIndex}`).type(
      target.title
    );
    getField(`${TargetFormMetaTestIds.descriptionField}-${ruleIndex}`).type(
      target.description
    );
    getField(`${TargetFormMetaTestIds.descriptionField}-${ruleIndex}`).type(
      target.description
    );
    getCheckBox(
      `${TargetFormMetaTestIds.requiredCheckbox}-${ruleIndex}`
    ).click();
    selectOption(
      `${TargetFormMetaTestIds.inputTypeSelector}-${ruleIndex}`,
      target.inputType
    );
    selectOption(
      `${TargetFormMetaTestIds.valueTypeSelector}-${ruleIndex}`,
      target.valueType
    );
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
      getTableRowAction(CollectionPageMetaTestIds.table, id, "view").should(
        "exist"
      );
      getTableRowAction(CollectionPageMetaTestIds.table, id, "delete").should(
        "exist"
      );
      getTableRowItem(CollectionPageMetaTestIds.table, id, "title").should(
        "have.text",
        "Brushing Teeth"
      );
      getTableRowItem(CollectionPageMetaTestIds.table, id, "type").should(
        "have.text",
        "MAIN"
      );
      getTableRowItem(
        CollectionPageMetaTestIds.table,
        id,
        "description"
      ).should("have.text", "Client needs to brush their teeth");
      getTableRowItem(CollectionPageMetaTestIds.table, id, "targets").should(
        "have.text",
        "1"
      );
    });
  });
  it("should add multiple program to programs", () => {
    createProgramHelper(program1).then((id) => {
      getTableRowAction(CollectionPageMetaTestIds.table, id, "view").should(
        "exist"
      );
      getTableRowAction(CollectionPageMetaTestIds.table, id, "delete").should(
        "exist"
      );
      getTableRowItem(CollectionPageMetaTestIds.table, id, "title").should(
        "have.text",
        "Brushing Teeth"
      );
      getTableRowItem(CollectionPageMetaTestIds.table, id, "type").should(
        "have.text",
        "MAIN"
      );
      getTableRowItem(
        CollectionPageMetaTestIds.table,
        id,
        "description"
      ).should("have.text", "Client needs to brush their teeth");
      getTableRowItem(CollectionPageMetaTestIds.table, id, "targets").should(
        "have.text",
        "1"
      );
    });

    createProgramHelper(program2).then((id) => {
      getTableRowAction(CollectionPageMetaTestIds.table, id, "view").should(
        "exist"
      );
      getTableRowAction(CollectionPageMetaTestIds.table, id, "delete").should(
        "exist"
      );
      getTableRowItem(CollectionPageMetaTestIds.table, id, "title").should(
        "have.text",
        "Eat Breakfast"
      );
      getTableRowItem(CollectionPageMetaTestIds.table, id, "type").should(
        "have.text",
        "MAIN"
      );
      getTableRowItem(
        CollectionPageMetaTestIds.table,
        id,
        "description"
      ).should("have.text", "Client needs to eat breakfast");
      getTableRowItem(CollectionPageMetaTestIds.table, id, "targets").should(
        "have.text",
        "3"
      );
    });
  });

  it("should clear values on cancel", () => {
    cy.visit(ROUTES.programs);
    getButton(CollectionPageMetaTestIds.addProgramBtn).click();
    getField(CollectionPageMetaTestIds.addProgramFormTitleField).type(
      program1.title
    );
    getField(CollectionPageMetaTestIds.addProgramFormDescriptionField).type(
      program1.description
    );
    getField(CollectionPageMetaTestIds.addProgramFormFormMaterialsField).type(
      program1.materials
    );
    getButton(AddModalControls.cancelBtn).click();
    getButton(CollectionPageMetaTestIds.addProgramBtn).click();
    getField(CollectionPageMetaTestIds.addProgramFormTitleField).should(
      "have.value",
      ""
    );
    getField(CollectionPageMetaTestIds.addProgramFormDescriptionField).should(
      "have.value",
      ""
    );
    getField(CollectionPageMetaTestIds.addProgramFormFormMaterialsField).should(
      "have.value",
      ""
    );
  });
});
