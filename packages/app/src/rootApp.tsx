import { Container, Container as DI } from "typedi";
import UIApi from "./domains/accessApis/uiApi/uiApi.Service";
import React from "react";
import { generateApp } from "./utils";
import { routes } from "./view/routes";
import { useAsync } from "react-use";
import AppController from "./domains/orchestration/app.service";
import { Spin } from "antd";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

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

export const App = () => {
  const { loading } = useAsync(async () => {
    const appController = Container.get(AppController);
    await appController.init();
  });

  if (loading) return <Spin />;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AppContent />
    </LocalizationProvider>
  );
};
