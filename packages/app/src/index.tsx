import "@babel/polyfill";
import React from "react";
import ReactDom from "react-dom";
import { Observable } from "rxjs";

import { generateRoutes } from "./utils";
import routes from "./routes";
import {
  authService,
  programData,
  schoolData,
  userData
} from "./services/dataAccess.service";
import { StateManger } from "./services/crud.service";

console.log("DATA", {
  schools: schoolData.getAll(),
  users: userData.getAll(),
  programs: programData.getAll()
});

const app = document.getElementById("app");

const webSocket = new WebSocket("ws://localhost:8080");

console.log("just before subscribe");

webSocket.onopen = () => console.log("User connection opened!");

export const socketObservable = new Observable((subscriber) => {
  webSocket.onmessage = (message: any) => {
    console.log("When socket updates", message.data);
    subscriber.next(JSON.parse(message.data));
  };
});

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, updateState] = React.useState({});
  React.useEffect(() => {
    StateManger.registerUpdateState(() => updateState({}));
  }, [updateState]);
  return generateRoutes(routes, authService);
};

ReactDom.render(<App />, app);
