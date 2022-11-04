import React from "react";
import { createLink, filterByProp } from "../utils";
import { IRoute } from "@parsimony/types";

import { Button } from "../components";
import { useServices } from "../context";
import { OpenChatButton } from "../containers";

export type INavProps = {
  routes: IRoute[];
};

const filterRoutesByName = (routes: IRoute[]) =>
  filterByProp<IRoute>(routes, "name");

export const Nav = ({ routes }: INavProps) => {
  const { authService } = useServices();
  return (
    <ul className="nav">
      {filterRoutesByName(routes).map((route: IRoute) => createLink(route))}
      <a className="nav-item">
        <Button name="Log Out" action={() => authService.logOut()} />
      </a>
      <a className="nav-item">
        <OpenChatButton />
      </a>
    </ul>
  );
};
