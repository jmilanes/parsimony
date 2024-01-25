import React from "react";
import { Container } from "typedi";
import {
  act,
  fireEvent,
  getByText,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Domains, UserPageMetaTestIds, UserRoles } from "@parsimony/types";
import { makeTestApp } from "../../../testUtils/makeTestApp";
import {
  getReadOnlySelector,
  getTableAction
} from "../../../testUtils/selectors";
import MockDBService from "../../../testUtils/mockDBService";
import { createUserPayload } from "../../../testUtils/dataCreation";

const setupData = {
  [Domains.User]: [
    createUserPayload({
      firstName: "Edit",
      lastName: "Me",
      email: "editMe@g.com",
      roles: [UserRoles.Director],
      type: UserRoles.Director
    })
  ]
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("User Page Tests", () => {
  const mockDbService = Container.get(MockDBService);
  beforeEach(async () => {
    await mockDbService.cleanUp();
    await mockDbService.setUpData(setupData);
  });

  afterEach(async () => {
    await mockDbService.cleanUp();
  });

  test("Should go to user page", async () => {
    const { app } = await makeTestApp({ initialRoute: "/directory" });
    render(app);
    const viewBtn = screen.getByTestId(getTableAction(0, "view"));
    await userEvent.click(viewBtn);
    await waitFor(async () => {
      const firstNameField = screen.getByTestId(
        getReadOnlySelector(UserPageMetaTestIds.firstNameField)
      );
      const lastNameField = screen.getByTestId(
        getReadOnlySelector(UserPageMetaTestIds.lastNameField)
      );

      const emailField = screen.getByTestId(
        getReadOnlySelector(UserPageMetaTestIds.emailField)
      );

      const typeSelector = screen.getByTestId(
        getReadOnlySelector(UserPageMetaTestIds.typeSelector)
      );
      const roleSelector = screen.getByTestId(
        getReadOnlySelector(UserPageMetaTestIds.roleMultiSelector)
      );

      // Validate Correct Values
      expect(firstNameField).toHaveTextContent("Edit");
      expect(lastNameField).toHaveTextContent("Me");
      expect(emailField).toHaveTextContent("editMe@g.com");
      expect(typeSelector).toHaveTextContent(UserRoles.Director);
      expect(roleSelector).toHaveTextContent(UserRoles.Director);
    });
  });

  test("Should edit user Director view", async () => {
    const { app } = await makeTestApp({ initialRoute: "/directory" });
    render(app);
    const viewBtn = screen.getByTestId(getTableAction(0, "view"));
    await userEvent.click(viewBtn);

    await waitFor(async () => {
      // Make Edits
      const editBtn = screen.getByTestId(UserPageMetaTestIds.edit);
      await userEvent.click(editBtn);
    });

    await waitFor(
      async () => {
        const firstNameField = screen.getByTestId(
          UserPageMetaTestIds.firstNameField
        );
        const lastNameField = screen.getByTestId(
          UserPageMetaTestIds.lastNameField
        );

        const emailField = screen.getByTestId(UserPageMetaTestIds.emailField);

        const typeSelectorInput = screen.getByTestId(
          `${UserPageMetaTestIds.typeSelector}-input`
        );

        const roleSelector = screen.getByTestId(
          UserPageMetaTestIds.roleMultiSelector
        );

        // Check expected Values
        expect(firstNameField).toHaveValue("Edit");
        expect(lastNameField).toHaveValue("Me");
        expect(emailField).toHaveValue("editMe@g.com");
        expect(typeSelectorInput).toHaveValue(UserRoles.Director);
        expect(roleSelector).toHaveValue(UserRoles.Director);

        // Update Values
        await userEvent.clear(firstNameField);
        await userEvent.type(firstNameField, "new first name");
        await userEvent.clear(lastNameField);
        await userEvent.type(lastNameField, "new last name");
        await userEvent.clear(emailField);
        await userEvent.type(emailField, "new@g.com");
      },
      { timeout: 5000 }
    );

    // Submit Updates
    const submitButton = screen.getByTestId(UserPageMetaTestIds.submitEdit);
    await userEvent.click(submitButton);

    await waitFor(async () => {
      const firstNameField = screen.getByTestId(
        getReadOnlySelector(UserPageMetaTestIds.firstNameField)
      );

      const lastNameField = screen.getByTestId(
        getReadOnlySelector(UserPageMetaTestIds.lastNameField)
      );

      const emailField = screen.getByTestId(
        getReadOnlySelector(UserPageMetaTestIds.emailField)
      );

      const typeSelector = screen.getByTestId(
        getReadOnlySelector(UserPageMetaTestIds.typeSelector)
      );
      const roleSelector = screen.getByTestId(
        getReadOnlySelector(UserPageMetaTestIds.roleMultiSelector)
      );

      // Validate updates happen
      expect(firstNameField).toHaveTextContent("new first name");
      expect(lastNameField).toHaveTextContent("new last name");
      expect(emailField).toHaveTextContent("new@g.com");
      expect(typeSelector).toHaveTextContent(UserRoles.Director);
      expect(roleSelector).toHaveTextContent(UserRoles.Director);
    });
  });

  test("Should work with selects", async () => {
    const { app } = await makeTestApp({ initialRoute: "/directory" });
    render(app);
    const viewBtn = screen.getByTestId(getTableAction(0, "view"));
    await userEvent.click(viewBtn);

    await waitFor(async () => {
      // Make Edits
      const editBtn = screen.getByTestId(UserPageMetaTestIds.edit);
      await userEvent.click(editBtn);
    });

    const typeSelector = screen.getByTestId(
      `${UserPageMetaTestIds.typeSelector}`
    );
    await act(async () => {
      await waitFor(() => {
        expect(typeSelector).toBeInTheDocument();
        expect(typeSelector).toHaveValue(UserRoles.Director);
      });

      fireEvent.change(typeSelector, {
        target: { value: UserRoles.Admin }
      });
    });
    await waitFor(async () => {
      expect(typeSelector).toHaveValue(UserRoles.Admin);
    });

    // ROLE

    const roleSelector = screen.getByTestId(
      UserPageMetaTestIds.roleMultiSelector
    );
    await waitFor(() => {
      expect(roleSelector).toBeInTheDocument();
      expect(roleSelector).toHaveValue(UserRoles.Director);
    });

    await userEvent.click(screen.getByText("DIRECTOR"));
    await userEvent.click(
      screen.getByTestId("update-user-role-field-option-ADMIN")
    );

    await waitFor(async () => {
      const roleSelector = screen.getByTestId(
        UserPageMetaTestIds.roleMultiSelector
      );
      expect(roleSelector).toHaveValue(
        `${UserRoles.Director},${UserRoles.Admin}`
      );
    });

    // ROLE END

    // Submit Updates
    const submitButton = screen.getByTestId(UserPageMetaTestIds.submitEdit);
    await userEvent.click(submitButton);

    await waitFor(async () => {
      const typeSelector = screen.getByTestId(
        getReadOnlySelector(UserPageMetaTestIds.typeSelector)
      );
      const roleSelector = screen.getByTestId(
        getReadOnlySelector(UserPageMetaTestIds.roleMultiSelector)
      );

      expect(typeSelector).toHaveTextContent(UserRoles.Admin);
      expect(roleSelector).toHaveTextContent(
        `${UserRoles.Director}, ${UserRoles.Admin}`
      );
    });
  });
});
