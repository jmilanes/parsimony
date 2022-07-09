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
import { uuid } from "./";
import { IRoute } from "@parsimony/types";

export const generateRoutes = (routes: IRoute[]) => {
  return (
    <HashRouter>
      <Nav routes={routes} />
      <Routes>
        {routes.map((route) => (
          <Route
            key={`route_${uuid()}`}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Routes>
    </HashRouter>
  );
};

export const creatLink = (link: IRoute, filterService?: any) => {
  return (
    <Link
      key={`${link.name || ""}_link_${uuid()}`}
      to={link.path}
      onClick={() => filterService?.clear()}
      className="nav-item"
    >
      <Button name={link.name || ""} action={() => null} />
    </Link>
  );
};

export const getRouterParams = useParams;

export const navigateToRoute = useNavigate;

export const getSearchParams = useSearchParams;
