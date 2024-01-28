import React from "react";
import { render, waitFor } from "@testing-library/react";

import {
  AuthPageMetaTestIds,
  BehaviorMetaTestIds,
  BookPageMetaTestIds,
  DirectoryPageMetaTestIds,
  NavMetaTestIds
} from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";
import {
  checkNotInDocument,
  checkVisibility,
  clickTarget
} from "../../../testUtils/actions.spec";

describe("Parsimony Navigation Tests", () => {
  test("Should be on login screen if not logged in", async () => {
    const { app } = await makeTestApp({ manualLogin: true });
    render(app);
    await waitFor(async () => {
      await checkVisibility(AuthPageMetaTestIds.schoolField);
      await checkVisibility(AuthPageMetaTestIds.emailField);
      await checkVisibility(AuthPageMetaTestIds.passwordField);
    });
  });

  test("Should Navigate to the Directory Page", async () => {
    const { app } = await makeTestApp();
    render(app);
    await waitFor(async () => {
      await clickTarget(NavMetaTestIds.directoryBtn);
      await checkVisibility(DirectoryPageMetaTestIds.addUserBtn);
    });
  });

  test("Should Navigate to the Books Page", async () => {
    const { app } = await makeTestApp();
    render(app);
    await waitFor(async () => {
      await clickTarget(NavMetaTestIds.booksBtn);
      await checkVisibility(BookPageMetaTestIds.addBtn);
    });
  });

  test("Should be able to navigate between pages", async () => {
    const { app } = await makeTestApp();
    render(app);

    await clickTarget(NavMetaTestIds.booksBtn);
    await waitFor(async () => {
      await checkVisibility(BookPageMetaTestIds.addBtn);
      await checkNotInDocument(DirectoryPageMetaTestIds.addUserBtn);
    });

    await clickTarget(NavMetaTestIds.directoryBtn);
    await waitFor(async () => {
      await checkVisibility(DirectoryPageMetaTestIds.addUserBtn);
      await checkNotInDocument(BookPageMetaTestIds.addBtn);
    });
  });

  test("Should Open behaviors sidebar", async () => {
    const { app } = await makeTestApp();
    render(app);
    await clickTarget(NavMetaTestIds.openBehhaviorSideBar);
    await waitFor(async () => {
      await checkVisibility(BehaviorMetaTestIds.addClient);
    });
  });
});
