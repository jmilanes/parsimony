import "@babel/polyfill";
import React from "react";
import ReactDom from "react-dom";

import { generateRoutes } from "./utils";
import routes from "./routes";
import AppController from "./services/app.service";
import { createServicesProvider, useServices } from "./context";

const app = document.getElementById("app");
const appController = new AppController();
appController.init();

const ServicesProvider = createServicesProvider(appController.services);

const Routes = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, updateState] = React.useState({});
  const { stateManager } = useServices();
  React.useEffect(() => {
    stateManager.registerUpdateState(() => updateState({}));
  }, [updateState]);
  return generateRoutes(routes);
};

const App = () => {
  return (
    <ServicesProvider>
      <Routes />
    </ServicesProvider>
  );
};

ReactDom.render(<App />, app);
