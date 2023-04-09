import "reflect-metadata";
import "@babel/polyfill";
import React from "react";
import ReactDom from "react-dom";

import { generateRoutes } from "./utils";
import routes from "./routes";
import AppController from "./services/app.service";
import { createServicesProvider, useServices } from "./context";
import { Drawer } from "./containers";
import "antd/dist/antd.css";
import { useAsync } from "react-use";
import { Container } from "typedi";

const app = document.getElementById("app");

const AppContent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, updateState] = React.useState({});
  const { stateManager } = useServices();

  React.useEffect(() => {
    stateManager.registerUpdateState(() => {
      updateState({});
    });
  }, [updateState]);

  return (
    <>
      {generateRoutes(routes)}
      <Drawer />
    </>
  );
};

const App = () => {
  const { loading, value: services } = useAsync(async () => {
    const appController = Container.get(AppController);
    await appController.init();
    return appController.services;
  });
  if (loading) return null;
  const ServicesProvider = createServicesProvider(services);
  return (
    <ServicesProvider>
      <AppContent />
    </ServicesProvider>
  );
};

ReactDom.render(<App />, app);
