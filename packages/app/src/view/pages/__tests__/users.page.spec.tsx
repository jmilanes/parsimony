import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";
import AppController from "../../../domains/orchestration/app.service";
import UsersPage from "../users.page";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { DirectoryPageMetaTestIds } from "@parsimony/types/dist/enums/metaTestIds.enums";

test("Renders Parsimony Directory", async () => {
  const API = Container.get(UIApi);
  const appC = new AppController(API);
  await appC.init();
  render(
    <MemoryRouter initialEntries={["/users"]}>
      <UsersPage />
    </MemoryRouter>
  );
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
