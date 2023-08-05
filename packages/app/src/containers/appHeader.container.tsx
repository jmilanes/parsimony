import React from "react";
import { IRoute } from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../domains/uiApi/uiApi.Service";

import { Nav } from "../components";

export const AppHeader = ({ routes }: { routes: IRoute[] }) => {
  const API = Container.get(UIApi);
  const authService = API.system.Auth;
  const navigate = API.Navigation;
  return (
    <div className="header">
      <h1 className="logo" onClick={() => navigate("/")}>
        <span>P</span>arsimony
      </h1>

      {authService.isLoggedIn && <Nav routes={routes} />}
    </div>
  );
};
