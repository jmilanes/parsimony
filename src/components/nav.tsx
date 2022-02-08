import React from "react";
import { creatLink, filterByProp } from "../utils";
import { IRoute } from "../types";

export type INavProps = {
  routes: IRoute[];
};

const filterRoutesByName = (routes: IRoute[]) =>
  filterByProp<IRoute>(routes, "name");

const Nav = ({ routes }: INavProps) => (
  <ul>{filterRoutesByName(routes).map((route: IRoute) => creatLink(route))}</ul>
);

export default Nav;
