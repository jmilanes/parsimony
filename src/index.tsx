import React from "react";
import ReactDom from "react-dom";

import { generaterRoutes } from "./utils";
import routes from "./routes";
import {
  programData,
  schoolData,
  StateManger,
  userData
} from "./services/dataAccessServices";

console.log("DATA", {
  schools: schoolData.getAll(),
  users: userData.getAll(),
  programs: programData.getAll()
});

const app = document.getElementById("app");

const App = () => {
  const [_, updateState] = React.useState({});
  React.useEffect(() => {
    StateManger.registerUpdateState(() => updateState({}));
  }, [updateState]);
  return generaterRoutes(routes);
};

ReactDom.render(<App />, app);
