import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Link,
  useNavigate,
  useSearchParams
} from "react-router-dom";
import { Nav } from "../components";
import { uuid } from "./";
import { IRoute } from "../types";

export const generateRoutes = (routes: IRoute[]) => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export const creatLink = (link: IRoute, filterService?: any) => {
  return (
    <Link
      key={`${link.name || ""}_link_${uuid()}`}
      to={link.path}
      onClick={() => filterService?.clear()}
    >
      {link.name}
    </Link>
  );
};

export const getRouterParams = useParams;

export const navigateToRoute = useNavigate;

export const getSearchParams = useSearchParams;
