import { UserPageMetaTestIds } from "@parsimony/types";

import {
  getButton,
  getField,
  login,
  selectOption,
  getSelect,
  readOnlyLocator
} from "../../utilities";
import { DB_ACTIONS } from "../../utilities/db.utils";
import { ROUTES, user1 } from "../fixtures";

beforeEach(() => {
  login();
  cy.wait(2000);
});

afterEach(() => {
  DB_ACTIONS.cleanEntities();
});

describe("User Page Tests", () => {
  it("should edit user", () => {
    DB_ACTIONS.createUserRequest(user1).then((id) => {
      cy.visit(`${ROUTES.directory}/${id}`);
      getButton(UserPageMetaTestIds.edit).click();
      getField(UserPageMetaTestIds.firstNameField).type(" Updated Name");
      getField(UserPageMetaTestIds.lastNameField).type(" Updated Name");
      getField(UserPageMetaTestIds.phoneNumberField).type("1");
      selectOption(UserPageMetaTestIds.typeSelector, "ADMIN");
      selectOption(UserPageMetaTestIds.roleMultiSelector, "EMPLOYEE");
      selectOption(UserPageMetaTestIds.roleMultiSelector, "ADMIN");

      getButton(UserPageMetaTestIds.submitEdit).click();
      getField(readOnlyLocator(UserPageMetaTestIds.firstNameField)).should(
        "have.text",
        "Paul Updated Name"
      );
      getField(readOnlyLocator(UserPageMetaTestIds.lastNameField)).should(
        "have.text",
        "Pierce Updated Name"
      );

      getField(readOnlyLocator(UserPageMetaTestIds.phoneNumberField)).should(
        "have.text",
        "11111111111"
      );
      getSelect(readOnlyLocator(UserPageMetaTestIds.typeSelector)).should(
        "have.text",
        "ADMIN"
      );
      getSelect(readOnlyLocator(UserPageMetaTestIds.roleMultiSelector)).should(
        "have.text",
        "EMPLOYEE, ADMIN"
      );
    });
  });

  it("should cancel an edit ", () => {
    DB_ACTIONS.createUserRequest(user1).then((id) => {
      cy.visit(`${ROUTES.directory}/${id}`);
      getButton(UserPageMetaTestIds.edit).click();
      getField(UserPageMetaTestIds.firstNameField).type(" Updated Name");
      getField(UserPageMetaTestIds.lastNameField).type(" Updated Name");
      getField(UserPageMetaTestIds.phoneNumberField).type("1");
      selectOption(UserPageMetaTestIds.typeSelector, "ADMIN");
      selectOption(UserPageMetaTestIds.roleMultiSelector, "EMPLOYEE");
      selectOption(UserPageMetaTestIds.roleMultiSelector, "DIRECTOR");
      selectOption(UserPageMetaTestIds.roleMultiSelector, "ADMIN");

      getButton(UserPageMetaTestIds.cancelEdit).click();
      getField(readOnlyLocator(UserPageMetaTestIds.firstNameField)).should(
        "have.text",
        "Paul"
      );
      getField(readOnlyLocator(UserPageMetaTestIds.lastNameField)).should(
        "have.text",
        "Pierce"
      );

      getField(readOnlyLocator(UserPageMetaTestIds.phoneNumberField)).should(
        "have.text",
        "1111111111"
      );
      getSelect(readOnlyLocator(UserPageMetaTestIds.typeSelector)).should(
        "have.text",
        ""
      );
      getSelect(readOnlyLocator(UserPageMetaTestIds.roleMultiSelector)).should(
        "have.text",
        ""
      );
    });
  });
});
