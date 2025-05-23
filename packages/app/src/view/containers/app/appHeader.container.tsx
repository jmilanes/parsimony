import React from "react";
import { IRoute } from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

import { Nav } from "../../components";

export const AppHeader = ({ routes }: { routes: IRoute[] }) => {
  const API = Container.get(UIApi);
  const authService = API.system.Auth;
  const navigate = API.Navigate;

  return !authService.isLoggedIn ? null : (
    <div className="header">
      <h1 className="logo" onClick={() => navigate("/")}>
        <span>P</span>arsimony: {authService.getSchoolName()}
      </h1>

      {authService.isLoggedIn && <Nav routes={routes} />}
    </div>
  );
};
