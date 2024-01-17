import { IRoute } from "@parsimony/types/dist";
import { Container as DI } from "typedi";
import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";
import { HashRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import {
  AppHeader,
  DialogContainer,
  Drawer,
  NotificationContainer
} from "../../view/containers";
import { uuid } from "../abstractions.util";
import { Login } from "../../view/pages";
import React from "react";

export const makeTestApp = (routes: IRoute[], api: UIApi) => {
  const API = api;
  const authService = API.system.Auth;

  return (
    <MemoryRouter>
      <AppHeader routes={routes} />
      <div className={!authService.isLoggedIn ? "" : "innerContent"}>
        <Routes>
          {routes.map((route) => (
            <Route
              key={`route_${uuid()}`}
              path={route.path}
              element={
                !authService.isLoggedIn && route.path !== "/login" ? (
                  <Login from={route.path} />
                ) : (
                  <route.element />
                )
              }
            />
          ))}
        </Routes>
        <NotificationContainer />
        <Drawer />
        <DialogContainer />
      </div>
    </MemoryRouter>
  );
};
