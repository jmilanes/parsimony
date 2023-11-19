import * as React from "react";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../../rootApp";
import { NavMetaTestIds } from "@parsimony/types";

describe("User Page Tests Tests", () => {
  it("Should see initial users", async () => {
    await waitFor(() => {
      render(<App />);
    });
    const button = screen.getByText(NavMetaTestIds.directoryBtn);

    await userEvent.click(button);
    const firstName = screen.getByTestId("directory-table-row-0-col-firstName");
    expect(firstName.innerHTML).toBe("Joey");
  });
});
