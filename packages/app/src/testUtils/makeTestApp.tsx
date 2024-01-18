import React, { useEffect, useState } from "react";
import { Container } from "typedi";
import UIApi from "../domains/accessApis/uiApi/uiApi.Service";
import AppController from "../domains/orchestration/app.service";
import { MemoryRouter } from "react-router-dom";
import { generateApp } from "../utils";
import { routes } from "../view/routes";
import { UserRoles, User } from "@parsimony/types";

export type MakeTestAppArgs = {
  manualLogin?: boolean;
  initialRoute?: string;
  user?: User;
};

const DEFAULT_USER = {
  id: "11111",
  schoolId: "mockSchool",
  timeZone: "",
  roles: [UserRoles.Director],
  type: "",
  documents: [],
  password: "hello",
  email: "test@test.com",
  firstName: "Test",
  lastName: `User ${0}`,
  dateOfBirth: new Date(),
  phone: "1111111111",
  contacts: [],
  actionItems: [],
  programs: [],
  clients: [],
  threadDisplayNameName: "Test User",
  avatar: "",
  color: "red",
  serviceProvider: ""
};

export const makeTestApp = async ({
  manualLogin,
  initialRoute,
  user
}: MakeTestAppArgs = {}) => {
  const API = Container.get(UIApi);
  const appC = new AppController(API);
  await appC.init();

  API.system.Auth.setSchool("mockSchool");
  API.system.Auth.setCurrentUser(user || DEFAULT_USER);
  if (!manualLogin) {
    API.system.Auth.setLoggedIn(true);
  }
  const APP = () => {
    const [_, updateState] = useState({});

    const stateManager = API.system.StateService;

    useEffect(() => {
      stateManager.registerUpdateState(() => {
        updateState({});
      });
    }, [updateState]);

    return (
      <MemoryRouter initialEntries={[initialRoute || ""]}>
        {generateApp(routes)}
      </MemoryRouter>
    );
  };

  return {
    app: <APP />,
    API
  };
};
