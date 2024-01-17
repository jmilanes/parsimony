import { Container } from "typedi";
import UIApi from "../domains/accessApis/uiApi/uiApi.Service";
import AppController from "../domains/orchestration/app.service";
import { MemoryRouter } from "react-router-dom";
import { generateApp } from "../utils";
import { routes } from "../view/routes";
import React from "react";

export type MakeTestAppArgs = {
  manualLogin?: boolean;
  initialRoute?: string;
};

export const makeTestApp = async ({
  manualLogin,
  initialRoute
}: MakeTestAppArgs = {}) => {
  const API = Container.get(UIApi);
  const appC = new AppController(API);
  await appC.init();
  if (!manualLogin) {
    API.system.Auth.setLoggedIn(true);
  }
  const app = (
    <MemoryRouter initialEntries={[initialRoute || ""]}>
      {generateApp(routes)}
    </MemoryRouter>
  );

  return {
    app,
    API
  };
};
