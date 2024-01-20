import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import {
  AddModalControls,
  DirectoryPageMetaTestIds,
  UserPageMetaTestIds
} from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";
import { getTableAction, getTableData } from "../../../testUtils/selectors";

describe("Directory Page Tests", () => {
  test("Renders Parsimony Directory", async () => {
    const { app } = await makeTestApp({ initialRoute: "/directory" });
    render(app);
    await waitFor(async () => {
      const rowOneFirstName = screen.getByTestId(
        getTableData("directory", 0, "firstName")
      );
      const rowTwoFirstName = screen.getByTestId(
        getTableData("directory", 1, "firstName")
      );
      expect(rowOneFirstName).toBeVisible();
      expect(rowTwoFirstName).toBeVisible();

      const addButton = screen.getByTestId(DirectoryPageMetaTestIds.addUserBtn);
      await userEvent.click(addButton);
      const addUserFirstName = screen.getByTestId(
        DirectoryPageMetaTestIds.firstNameField
      );
      expect(addUserFirstName).toBeVisible();
    });
  });

  test("Should Add/Delete User to directory", async () => {
    const { app } = await makeTestApp({ initialRoute: "/directory" });
    render(app);

    // Open Add User Modal
    const addButton = screen.getByTestId(DirectoryPageMetaTestIds.addUserBtn);
    await userEvent.click(addButton);

    // Add User
    await waitFor(async () => {
      const firstNameField = screen.getByTestId(
        DirectoryPageMetaTestIds.firstNameField
      );
      const lastNameField = screen.getByTestId(
        DirectoryPageMetaTestIds.lastNameField
      );
      const emailField = screen.getByTestId(
        DirectoryPageMetaTestIds.emailField
      );

      await userEvent.type(firstNameField, "Jimmy");
      await userEvent.type(lastNameField, "Fallon");
      await userEvent.type(emailField, "jfallon@gmail.com");

      expect(firstNameField).toHaveValue("Jimmy");
      expect(lastNameField).toHaveValue("Fallon");
      expect(emailField).toHaveValue("jfallon@gmail.com");
      const createBtn = screen.getByTestId(AddModalControls.createBtn);
      await userEvent.click(createBtn);
    });

    // Check if added
    await waitFor(async () => {
      const addedRowFirstName = screen.getByTestId(
        getTableData("directory", 2, "firstName")
      );
      expect(addedRowFirstName).toBeVisible();
      expect(addedRowFirstName).toHaveTextContent("Jimmy");
    });

    const deleteBtn = screen.getByTestId(getTableAction(0, "delete"));
    await userEvent.click(deleteBtn);

    //Check if delete
    await waitFor(() => {
      const addedRowFirstName = screen.queryByTestId(
        getTableData("directory", 2, "firstName")
      );
      expect(addedRowFirstName).not.toBeInTheDocument();
    });
  });
});
