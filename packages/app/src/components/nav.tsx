import React from "react";
import { createLink, filterByProp } from "../utils";
import { IRoute } from "@parsimony/types";
import { authService, filterService } from "../services/dataAccessServices";
import Button from "./button";

export type INavProps = {
  routes: IRoute[];
};

const filterRoutesByName = (routes: IRoute[]) =>
  filterByProp<IRoute>(routes, "name");

const Nav = ({ routes }: INavProps) => (
  <ul className="nav">
    {filterRoutesByName(routes).map((route: IRoute) =>
      createLink(route, filterService)
    )}
    <a className="nav-item">
      <Button name="Log Out" action={() => authService.logOut()} />
    </a>
  </ul>
);

export default Nav;
