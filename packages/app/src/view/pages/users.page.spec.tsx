import * as React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import { graphql, HttpResponse } from "msw";
// import { setupServer } from "msw/node";
// import { initialUserData } from "../../fixtures";
import { App } from "../../index";
import { NavMetaTestIds } from "@parsimony/types";

// I need to do things like called with so that if so I know if values  changed

// const server = setupServer(
//   graphql.query("getAllUsers", () => {
//     return HttpResponse.json({
//       data: {
//         users: [
//           { ...initialUserData, id: 1, firstName: "Joey" },
//           { ...initialUserData, id: 1, firstName: "Molly" },
//           { ...initialUserData, id: 1, firstName: "Kat" }
//         ]
//       }
//     });
//   })
// );

describe("User Page Tests Tests", async () => {
  // beforeAll(() => server.listen());
  // afterEach(() => server.resetHandlers());
  // afterAll(() => server.close());

  it("Should see initial users", async () => {
    await render(<App />);
    const button = screen.getByTestId(NavMetaTestIds.directoryBtn);
    await userEvent.click(button);
    const firstName = screen.getByTestId("directory-table-row-0-col-firstName");
    expect(firstName.innerHTML).toBe("Joey");
  });
});
