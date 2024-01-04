import "reflect-metadata";
import { makeMockServer } from "./testUtils/makeMockServer";
import { makeServer } from "./domains/server/makeServer";

export const getParam = (param: string) =>
  process.argv[process.argv.indexOf(param) + 1];

const mode = getParam("--mode");

if (mode === "test") {
  void makeMockServer();
} else {
  void makeServer();
}
