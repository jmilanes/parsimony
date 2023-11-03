import React from "react";
import { createLink, filterByProp } from "../utils";
import { IRoute, NavMetaTestIds } from "@parsimony/types";

import { Button } from "../components";
import {
  OpenBehaviorButton,
  OpenBulkProgramButton,
  OpenChatButton,
  OpenProgramViewButton
} from "../containers";
import { Container as DI } from "typedi";
import UIApi from "../domains/accessApis/uiApi/uiApi.Service";

export type INavProps = {
  routes: IRoute[];
};

const filterRoutesByName = (routes: IRoute[]) =>
  filterByProp<IRoute>(routes, "name");

export const Nav = ({ routes }: INavProps) => {
  const API = DI.get(UIApi);
  const authService = API.system.Auth;
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
        <OpenProgramViewButton />
      </a>
      <a className="nav-item">
        <OpenBehaviorButton />
      </a>
      <a className="nav-item">
        <OpenChatButton />
      </a>
    </ul>
  );
};
