import {
  AddModalControls,
  CleanFnTypes,
  DirectoryPageMetaTestIds,
  Program,
  ProgramsPageMetaTestIds,
  RulesFormMetaTestIds,
  User
} from "@parsimony/types/src";
import { API_URL, ROUTES } from "../cypress/fixtures";
import {
  getButton,
  getCheckBox,
  getField,
  getTableRowAction,
  getTableRowItem,
  selectMultipleOptions,
  selectOption
} from "./locators.utils";

const cleanDirectory = (id) => () => {
  cy.visit(ROUTES.directory);
  getTableRowAction(DirectoryPageMetaTestIds.table, id, "delete").click();

  getTableRowAction(DirectoryPageMetaTestIds.table, id, "view").should(
    "not.exist"
  );

  getTableRowAction(
    DirectoryPageMetaTestIds.tableActionView,
    id,
    "delete"
  ).should("not.exist");
};

const cleanProgram = (id) => () => {
  cy.visit(ROUTES.programs);
  getTableRowAction(ProgramsPageMetaTestIds.table, id, "delete").click();
  getTableRowAction(DirectoryPageMetaTestIds.table, id, "view").should(
    "not.exist"
  );
  getTableRowAction(
    DirectoryPageMetaTestIds.tableActionView,
    id,
    "delete"
  ).should("not.exist");
};

const cleanFns = {
  [CleanFnTypes.DIRECTORY]: cleanDirectory,
  [CleanFnTypes.PROGRAM]: cleanProgram
};

class DBManager {
  cleanDbFns: any[];
  constructor() {
    this.cleanDbFns = [];
  }

  public addCleanDbFn(id: string, type: CleanFnTypes) {
    this.cleanDbFns.push(cleanFns[type](id));
  }

  public cleanDb() {
    this.cleanDbFns.forEach((fn) => fn());
    this.cleanDbFns = [];
  }

  public createUser(user: Partial<User>) {
    cy.visit(ROUTES.directory);
    getButton(DirectoryPageMetaTestIds.addUserBtn).click();
    getField(DirectoryPageMetaTestIds.firstNameField).type(user.firstName);
    getField(DirectoryPageMetaTestIds.lastNameField).type(user.lastName);
    getField(DirectoryPageMetaTestIds.phoneNumberField).type(user.phone);
    getField(DirectoryPageMetaTestIds.emailField).type(user.email);
    getField(DirectoryPageMetaTestIds.passwordField).type(user.password);

    cy.intercept(API_URL).as("apiRequest");
    getButton(AddModalControls.createBtn).click();
    return cy.wait("@apiRequest").then((interception) => {
      let id = interception.response.body.data.createUser.id;
      this.addCleanDbFn(id, CleanFnTypes.DIRECTORY);
      return id;
    });
  }

  public createProgram(program: Partial<Program>) {
    cy.visit(ROUTES.programs);
    getButton(ProgramsPageMetaTestIds.addBtn).click();
    getField(ProgramsPageMetaTestIds.titleField).type(program.title);
    getField(ProgramsPageMetaTestIds.descriptionField).type(
      program.description
    );

    selectOption(ProgramsPageMetaTestIds.typeSelector, program.type);
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
      selectOption(
        `${RulesFormMetaTestIds.stepsSelector}-${ruleIndex}`,
        rule.steps.toString()
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
      this.addCleanDbFn(id, CleanFnTypes.PROGRAM);
      return id;
    });
  }
}

export const DB_ACTIONS = new DBManager();
