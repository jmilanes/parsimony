import "reflect-metadata";
import { makeApp, makeTestApp } from "./domains/api/server/makeApp";

export const getParam = (param: string) =>
  process.argv[process.argv.indexOf(param) + 1];

const mode = getParam("--mode");

if (mode === "test") {
  void makeTestApp();
} else {
  void makeApp();
}
