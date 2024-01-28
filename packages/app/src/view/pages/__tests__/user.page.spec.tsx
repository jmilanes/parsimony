import React from "react";
import { Container } from "typedi";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DirectoryPageMetaTestIds,
  UserPageMetaTestIds,
  UserRoles
} from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";
import { getTableAction } from "../../../testUtils/selectors";
import { MockDBService } from "../../../testUtils/mockDBService";

import {
  checkReadOnlySelectorValue,
  checkSelectorValue,
  clearAndTypeValueToTarget,
  clickTarget,
  selectOption
} from "../../../testUtils/actions.spec";
import { initialUserPageTestData } from "../fixtures/user.page.fixtures";

describe("User Page Tests", () => {
  const mockDbService = Container.get(MockDBService);
  beforeEach(async () => {
    await mockDbService.cleanUp();
    await mockDbService.setUpData(initialUserPageTestData);
  });

  afterEach(async () => {
    await mockDbService.cleanUp();
  });

  test("Should go to user page", async () => {
    const { app } = await makeTestApp({ initialRoute: "/directory" });
    render(app);
    await clickTarget(
      getTableAction({
        tableName: DirectoryPageMetaTestIds.table,
        rowIndex: 0,
        action: "view"
      })
    );

    await waitFor(async () => {
      await checkReadOnlySelectorValue(
        UserPageMetaTestIds.firstNameField,
        "Edit"
      );
      await checkReadOnlySelectorValue(UserPageMetaTestIds.lastNameField, "Me");
      await checkReadOnlySelectorValue(
        UserPageMetaTestIds.emailField,
        "editMe@g.com"
      );
      await checkReadOnlySelectorValue(
        UserPageMetaTestIds.typeSelector,
        UserRoles.Director
      );
      await checkReadOnlySelectorValue(
        UserPageMetaTestIds.roleMultiSelector,
        UserRoles.Director
      );
    });
  });

  test("Should edit user Director view", async () => {
    const { app } = await makeTestApp({ initialRoute: "/directory" });
    render(app);
    await clickTarget(
      getTableAction({
        tableName: DirectoryPageMetaTestIds.table,
        rowIndex: 0,
        action: "view"
      })
    );

    await waitFor(async () => {
      // Make Edits
      await clickTarget(UserPageMetaTestIds.edit);
    });

    await waitFor(
      async () => {
        await checkSelectorValue(UserPageMetaTestIds.firstNameField, "Edit");
        await checkSelectorValue(UserPageMetaTestIds.lastNameField, "Me");
        await checkSelectorValue(
          UserPageMetaTestIds.emailField,
          "editMe@g.com"
        );
        await checkSelectorValue(
          UserPageMetaTestIds.typeSelector,
          UserRoles.Director
        );
        await checkSelectorValue(
          UserPageMetaTestIds.roleMultiSelector,
          UserRoles.Director
        );

        // Update Values
        await clearAndTypeValueToTarget(
          UserPageMetaTestIds.firstNameField,
          "new first name"
        );
        await clearAndTypeValueToTarget(
          UserPageMetaTestIds.lastNameField,
          "new last name"
        );
        await clearAndTypeValueToTarget(
          UserPageMetaTestIds.emailField,
          "new@g.com"
        );
      },
      { timeout: 5000 }
    );

    // Submit Updates
    await clickTarget(UserPageMetaTestIds.submitEdit);

    await waitFor(async () => {
      // Validate updates happen
      await checkSelectorValue(
        UserPageMetaTestIds.firstNameField,
        "new first name"
      );
      await checkSelectorValue(
        UserPageMetaTestIds.lastNameField,
        "new last name"
      );
      await checkSelectorValue(UserPageMetaTestIds.emailField, "new@g.com");
      await checkSelectorValue(
        UserPageMetaTestIds.typeSelector,
        UserRoles.Director
      );
      await checkSelectorValue(
        UserPageMetaTestIds.roleMultiSelector,
        UserRoles.Director
      );
    });
  });

  test("Should work with selects", async () => {
    const { app } = await makeTestApp({ initialRoute: "/directory" });
    render(app);
    await clickTarget(
      getTableAction({
        tableName: DirectoryPageMetaTestIds.table,
        rowIndex: 0,
        action: "view"
      })
    );

    await waitFor(async () => {
      // Make Edits
      const editBtn = screen.getByTestId(UserPageMetaTestIds.edit);
      await userEvent.click(editBtn);
    });

    await selectOption({
      target: UserPageMetaTestIds.typeSelector,
      selectedOption: UserRoles.Admin,
      currentValue: UserRoles.Director
    });
    await selectOption({
      target: UserPageMetaTestIds.roleMultiSelector,
      selectedOption: UserRoles.Admin,
      currentValue: UserRoles.Director
    });

    // Submit Updates
    await clickTarget(UserPageMetaTestIds.submitEdit);

    await waitFor(async () => {
      await checkReadOnlySelectorValue(
        UserPageMetaTestIds.typeSelector,
        UserRoles.Admin
      );
      await checkReadOnlySelectorValue(
        UserPageMetaTestIds.roleMultiSelector,
        `${UserRoles.Director}, ${UserRoles.Admin}`
      );
    });
  });
});
