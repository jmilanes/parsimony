import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../../../rootApp";
import { AuthPageMetaTestIds } from "@parsimony/types/dist";
import LoginPage from "../login.page";
import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";
import AppController from "../../../domains/orchestration/app.service";

test("Renders Parsimony Login", async () => {
  // What if we do individual pages
  // Mock a way to do auth or just skip for the testing server since we know it is working
  // and we cna test that another way auth but it is solid and not changing for a bit

  // watch for the responses because that is what we care about
  // Maybe make some updates in ass (auth state should all go there)
  // Then we can watch that... or a combination of response and the app state
  // This is why we have the app state to do all of this
  // need an easy way to pass in a create UI API

  // Try with user page

  // All response need to be feeding in App state so we can check if it is working
  // including auth!

  // I can just make my Mock UAPI with all the inits we are doing in the
  // "REACT" stuff of the outer app and find a way to inject it :D

  // And we need to expose a way to grab the app state.

  // Based on all that would we have confidence and speed?
  const API = Container.get(UIApi);
  const appC = new AppController(API);
  await appC.init();
  render(<LoginPage from={"/home"} />);
  await waitFor(async () => {
    const emailField = screen.getByTestId(AuthPageMetaTestIds.emailField);
    const passwordField = screen.getByTestId(AuthPageMetaTestIds.passwordField);
    const loginButton = screen.getByTestId(AuthPageMetaTestIds.loginBtn);

    expect(emailField).toBeVisible();
    expect(passwordField).toBeVisible();
    expect(loginButton).toBeVisible();

    await userEvent.type(emailField, "ts@g.com");
    await userEvent.type(passwordField, "12345");
    await userEvent.click(loginButton);
  });
});
