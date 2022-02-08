import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Link,
  useNavigate
} from "react-router-dom";
import ComponentsService from "../services/componentsService";
import { uuid } from "./";
import { IRoute } from "../types";

export const generaterRoutes = (routes: IRoute[]) => {
  return (
    <BrowserRouter>
      {ComponentsService.Nav({ routes })}
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

export const creatLink = (link: IRoute) => (
  <Link key={`${link.name}_link_${uuid()}`} to={link.path}>
    {link.name}
  </Link>
);

export const getRouterParams = useParams;

export const navigateToRoute = useNavigate;
