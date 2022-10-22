import "@babel/polyfill";
import React from "react";
import ReactDom from "react-dom";

import { generateRoutes } from "./utils";
import routes from "./routes";
import AppController from "./services/app.service";
import { createServicesProvider, useServices } from "./context";
import { Drawer } from "./containers";
import "antd/dist/antd.css";

const app = document.getElementById("app");

const AppContent = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, updateState] = React.useState({});
  const { stateManager } = useServices();

  React.useEffect(() => {
    stateManager.registerUpdateState(() => {
      console.log("UPDATED STATE");
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
  const appController = new AppController();
  appController.init();
  const ServicesProvider = createServicesProvider(appController.services);
  return (
    <ServicesProvider>
      <AppContent />
    </ServicesProvider>
  );
};

ReactDom.render(<App />, app);
