import React from "react";
import ReactDom from "react-dom";

import { generateRoutes } from "./utils";
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

const webSocket = new WebSocket("ws://localhost:8080");

webSocket.onopen = () => console.log("User connection opened!");

webSocket.onmessage = (message: any) => {
  console.log(
    "🚀 ~ file: index.tsx ~ line 28 ~ message",
    JSON.parse(message.data)
  );
};

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, updateState] = React.useState({});
  React.useEffect(() => {
    StateManger.registerUpdateState(() => updateState({}));
  }, [updateState]);
  return generateRoutes(routes);
};

ReactDom.render(<App />, app);
