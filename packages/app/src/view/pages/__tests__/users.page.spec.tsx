import React from "react";
import { render, waitFor } from "@testing-library/react";

import { AddModalControls, DirectoryPageMetaTestIds } from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";
import { getTableAction, getTableData } from "../../../testUtils/selectors";

import { Container } from "typedi";
import MockDBService from "../../../testUtils/mockDBService";
import { initialUsersPageData } from "./fixtures/usersPage.fixtures";
import {
  checkNotInDocument,
  checkSelectorTextContent,
  checkSelectorValue,
  checkVisibility,
  clickTarget,
  typeValueToTarget
} from "../../../testUtils/actions.spec";

describe("Directory Page Tests", () => {
  const mockDbService = Container.get(MockDBService);
  beforeEach(async () => {
    await mockDbService.cleanUp();
    await mockDbService.setUpData(initialUsersPageData);
  });

  afterEach(async () => {
    await mockDbService.cleanUp();
  });

  test("Renders Parsimony Directory", async () => {
    const { app } = await makeTestApp({ initialRoute: "/directory" });
    render(app);
    await waitFor(async () => {
      await checkVisibility(getTableData("directory", 0, "firstName"));
      await checkVisibility(getTableData("directory", 1, "firstName"));
      await clickTarget(DirectoryPageMetaTestIds.addUserBtn);
      await checkVisibility(DirectoryPageMetaTestIds.firstNameField);
    });
  });

  test("Should Add/Delete User to directory", async () => {
    const { app } = await makeTestApp({ initialRoute: "/directory" });
    render(app);

    await checkVisibility(getTableData("directory", 0, "firstName"));
    await checkVisibility(getTableData("directory", 1, "firstName"));
    await checkNotInDocument(getTableData("directory", 2, "firstName"));

    // Open Add User Modal
    await clickTarget(DirectoryPageMetaTestIds.addUserBtn);

    // Add User
    await waitFor(async () => {
      await typeValueToTarget(DirectoryPageMetaTestIds.firstNameField, "Jimmy");
      await typeValueToTarget(DirectoryPageMetaTestIds.lastNameField, "Fallon");
      await typeValueToTarget(
        DirectoryPageMetaTestIds.emailField,
        "jfallon@gmail.com"
      );

      await checkSelectorValue(
        DirectoryPageMetaTestIds.firstNameField,
        "Jimmy"
      );
      await checkSelectorValue(
        DirectoryPageMetaTestIds.lastNameField,
        "Fallon"
      );
      await checkSelectorValue(
        DirectoryPageMetaTestIds.emailField,
        "jfallon@gmail.com"
      );
    });

    await clickTarget(AddModalControls.createBtn);
    // Check if added
    await waitFor(async () => {
      const thirdRowSelector = getTableData("directory", 2, "firstName");
      await checkVisibility(thirdRowSelector);
      await checkSelectorTextContent(thirdRowSelector, "Jimmy");
    });

    await clickTarget(getTableAction(2, "delete"));

    //Check if delete
    await waitFor(async () => {
      await checkNotInDocument(getTableData("directory", 2, "firstName"));
    });
  });
});
