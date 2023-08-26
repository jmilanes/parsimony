import "reflect-metadata";
import "@babel/polyfill";
import React from "react";
import ReactDom from "react-dom";

import { generateApp } from "./utils";
import routes from "./routes";
import AppController from "./services/app.service";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "antd/dist/antd.css";
import { useAsync } from "react-use";
import { Container as DI, Container } from "typedi";
import { Spin } from "antd";
import UIApi from "./domains/uiApi/uiApi.Service";

const app = document.getElementById("app");

const AppContent = () => {
  const API = DI.get(UIApi);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, updateState] = React.useState({});

  const stateManager = API.system.StateService;

  React.useEffect(() => {
    stateManager.registerUpdateState(() => {
      updateState({});
    });
  }, [updateState]);

  return <div>{generateApp(routes)}</div>;
};

const App = () => {
  const { loading } = useAsync(async () => {
    const appController = Container.get(AppController);
    await appController.init();
  });

  if (loading) return <Spin />;

  return <AppContent />;
};

ReactDom.render(
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <App />
  </LocalizationProvider>,
  app
);
