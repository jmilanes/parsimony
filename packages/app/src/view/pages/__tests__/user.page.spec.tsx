import React from "react";
import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { UserPageMetaTestIds } from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";
import {
  getReadOnlySelector,
  getTableAction
} from "../../../testUtils/selectors";

describe("User Page Tests", () => {
  test("Should go to user page", async () => {
    const { app } = await makeTestApp({ initialRoute: "/directory" });
    render(app);
    const viewBtn = screen.getByTestId(getTableAction(0, "view"));
    await userEvent.click(viewBtn);
    await waitFor(async () => {
      const userPageFirstNameField = screen.getByTestId(
        getReadOnlySelector(UserPageMetaTestIds.firstNameField)
      );
      expect(userPageFirstNameField).toBeVisible();
      expect(userPageFirstNameField).toHaveTextContent("Tom");
    });
  });
});
