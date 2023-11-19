import "reflect-metadata";
import "@babel/polyfill";
import React from "react";
import ReactDom from "react-dom";

import "antd/dist/antd.css";

import { App } from "./rootApp";

const app = document.getElementById("app");

ReactDom.render(<App />, app);
