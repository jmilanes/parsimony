import React from "react";

import {
  Routes,
  Route,
  useParams,
  Link,
  useNavigate,
  useSearchParams,
  HashRouter
} from "react-router-dom";
import { Button, Nav } from "../view/components";
import { uuid } from ".";
import { IRoute } from "@parsimony/types";
import { Login } from "../view/pages";
import { Container as DI } from "typedi";
import UIApi from "../domains/accessApis/uiApi/uiApi.Service";
import {
  AppHeader,
  Drawer,
  DialogContainer,
  NotificationContainer
} from "../view/containers";

export const generateApp = (routes: IRoute[]) => {
  const API = DI.get(UIApi);
  const authService = API.system.Auth;

  return (
    <HashRouter>
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
    </HashRouter>
  );
};

export const createLink = (link: IRoute) => {
  return (
    <Link
      key={`${link.name || ""}_link_${uuid()}`}
      to={link.path}
      className="nav-item"
    >
      <Button
        name={link.name || ""}
        action={() => null}
        //@ts-expect-error
        metaTestId={link.metaTestId}
      />
    </Link>
  );
};

export const getRouterParams = useParams;

export const navigateToRoute = useNavigate;

export const getSearchParams = useSearchParams;
