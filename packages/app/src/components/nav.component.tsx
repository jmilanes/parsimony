import React from "react";
import { createLink, filterByProp, getFullName } from "../utils";
import { IRoute, NavMetaTestIds, User } from "@parsimony/types";

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
        <Button
          name="Log Out"
          action={async () => await authService.logOut()}
          metaTestId={NavMetaTestIds.logoutBtn}
        />
      </a>
      <a className="nav-item">
        <OpenChatButton />
      </a>
      <p>
        {authService.getCurrentUser() &&
          getFullName(authService.getCurrentUser() as User)}{" "}
        is logged in
      </p>
    </ul>
  );
};
