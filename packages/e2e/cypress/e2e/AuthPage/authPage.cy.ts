import { AuthPageDataIds } from "@parsimony/types";
import { getButton } from "../../../utilities";

describe("Auth Page testing", () => {
  it("Reset Password Button Toggle works", () => {
    cy.visit("http://localhost:1234/#/");

    getButton(AuthPageDataIds.loginBtn).should("exist");
    getButton(AuthPageDataIds.resetBtn).should("not.exist");
    getButton(AuthPageDataIds.cancelBtn).should("not.exist");
    getButton(AuthPageDataIds.resetPasswordBtn).should("exist");

    getButton(AuthPageDataIds.resetPasswordBtn).click();

    getButton(AuthPageDataIds.loginBtn).should("not.exist");
    getButton(AuthPageDataIds.resetBtn).should("exist");
    getButton(AuthPageDataIds.cancelBtn).should("exist");
    getButton(AuthPageDataIds.resetPasswordBtn).should("not.exist");

    getButton(AuthPageDataIds.cancelBtn).click();

    getButton(AuthPageDataIds.loginBtn).should("exist");
    getButton(AuthPageDataIds.resetBtn).should("not.exist");
    getButton(AuthPageDataIds.cancelBtn).should("not.exist");
    getButton(AuthPageDataIds.resetPasswordBtn).should("exist");
  });
});
