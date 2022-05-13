import React from "react";
import { creatLink, filterByProp } from "../utils";
import { IRoute } from "../types";
import { filterService } from "../services/dataAccessServices";

export type INavProps = {
  routes: IRoute[];
};

const filterRoutesByName = (routes: IRoute[]) =>
  filterByProp<IRoute>(routes, "name");

const Nav = ({ routes }: INavProps) => (
  <ul className="nav">
    {filterRoutesByName(routes).map((route: IRoute) =>
      creatLink(route, filterService)
    )}
  </ul>
);

export default Nav;
