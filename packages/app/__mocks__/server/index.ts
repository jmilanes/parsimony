import { graphql, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { initialUserData } from "../../src/fixtures";

export const server = setupServer(
  graphql.query("GetAllUsers", () => {
    return HttpResponse.json({
      data: {
        users: [
          { ...initialUserData, id: 1, firstName: "Joey" },
          { ...initialUserData, id: 1, firstName: "Molly" },
          { ...initialUserData, id: 1, firstName: "Kat" }
        ]
      }
    });
  })
);
