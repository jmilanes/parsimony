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
import { Button, Nav } from "../components";
import { uuid } from ".";
import { IRoute } from "@parsimony/types";
import { Login } from "../pages";
import { useServices } from "../context";
import { Spin } from "antd";

export const generateRoutes = (routes: IRoute[]) => {
  const { authService, appService } = useServices();
  if (appService.isLoading) return <Spin />;
  return (
    <HashRouter>
      {authService.isLoggedIn && <Nav routes={routes} />}
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
    </HashRouter>
  );
};

export const createLink = (link: IRoute) => {
  const { filterService } = useServices();
  return (
    <Link
      key={`${link.name || ""}_link_${uuid()}`}
      to={link.path}
      onClick={() => filterService?.clear()}
      className="nav-item"
    >
      <Button
        name={link.name || ""}
        action={() => null}
        dataTestId={link.dataTestId}
      />
    </Link>
  );
};

export const getRouterParams = useParams;

export const navigateToRoute = useNavigate;

export const getSearchParams = useSearchParams;
