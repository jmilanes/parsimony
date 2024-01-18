import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import {
  AuthPageMetaTestIds,
  BehaviorMetaTestIds,
  BookPageMetaTestIds,
  DirectoryPageMetaTestIds,
  NavMetaTestIds
} from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";

describe("Parsimony Navigation Tests", () => {
  test("Should be on login screen if not logged in", async () => {
    const { app } = await makeTestApp({ manualLogin: true });
    render(app);
    await waitFor(async () => {
      const schoolSelector = screen.getByTestId(
        AuthPageMetaTestIds.schoolField
      );
      const emailField = screen.getByTestId(AuthPageMetaTestIds.emailField);
      const passwordField = screen.getByTestId(
        AuthPageMetaTestIds.passwordField
      );
      expect(schoolSelector).toBeVisible();
      expect(emailField).toBeVisible();
      expect(passwordField).toBeVisible();
    });
  });

  test("Should Navigate to the Directory Page", async () => {
    const { app } = await makeTestApp();
    render(app);
    await waitFor(async () => {
      const navBtn = screen.getByTestId(NavMetaTestIds.directoryBtn);
      await userEvent.click(navBtn);
      const addButton = screen.getByTestId(DirectoryPageMetaTestIds.addUserBtn);
      expect(addButton).toBeVisible();
    });
  });

  test("Should Navigate to the Books Page", async () => {
    const { app } = await makeTestApp();
    render(app);
    await waitFor(async () => {
      const navBtn = screen.getByTestId(NavMetaTestIds.booksBtn);
      await userEvent.click(navBtn);
      const addButton = screen.getByTestId(BookPageMetaTestIds.addBtn);
      expect(addButton).toBeVisible();
    });
  });

  test("Should be able to navigate between pages", async () => {
    const { app } = await makeTestApp();
    render(app);

    const booksNavBtn = screen.getByTestId(NavMetaTestIds.booksBtn);
    await userEvent.click(booksNavBtn);
    await waitFor(async () => {
      const booksAddButton = screen.getByTestId(BookPageMetaTestIds.addBtn);
      const directoryAddBtn = screen.queryByTestId(
        DirectoryPageMetaTestIds.addUserBtn
      );
      expect(booksAddButton).toBeVisible();
      expect(directoryAddBtn).not.toBeInTheDocument();
    });

    const directoryNavBtn = screen.getByTestId(NavMetaTestIds.directoryBtn);
    await userEvent.click(directoryNavBtn);
    await waitFor(async () => {
      const booksAddButton = screen.queryByTestId(BookPageMetaTestIds.addBtn);
      const directoryAddBtn = screen.getByTestId(
        DirectoryPageMetaTestIds.addUserBtn
      );
      expect(booksAddButton).not.toBeInTheDocument();
      expect(directoryAddBtn).toBeVisible();
    });
  });

  test("Should Open behaviors sidebar", async () => {
    const { app } = await makeTestApp();
    render(app);
    const navBtn = screen.getByTestId(NavMetaTestIds.openBehhaviorSideBar);
    await userEvent.click(navBtn);
    await waitFor(async () => {
      const addButton = screen.getByTestId(BehaviorMetaTestIds.addClient);
      expect(addButton).toBeVisible();
    });
  });
});
