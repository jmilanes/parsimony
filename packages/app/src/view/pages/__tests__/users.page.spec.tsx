import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { DirectoryPageMetaTestIds } from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";

test("Renders Parsimony Directory", async () => {
  const { app } = await makeTestApp({ initialRoute: "/directory" });

  render(app);
  await waitFor(async () => {
    const rowOneFirstName = screen.getByTestId(
      "directory-table-row-0-col-firstName"
    );
    const rowTwoFirstName = screen.getByTestId(
      "directory-table-row-1-col-firstName"
    );
    const row1DeleteButton = screen.getByTestId(
      "row-0-col-delete-table-action"
    );
    const addButton = screen.getByTestId(DirectoryPageMetaTestIds.addUserBtn);

    expect(rowOneFirstName).toBeVisible();
    expect(rowTwoFirstName).toBeVisible();
    expect(row1DeleteButton).toBeVisible();

    await userEvent.click(addButton);

    const addUserFirstName = screen.getByTestId(
      DirectoryPageMetaTestIds.firstNameField
    );
    expect(addUserFirstName).toBeVisible();
  });
});
