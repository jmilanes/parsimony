import React from "react";
import { Pages } from "../enums";
import { Header } from "../components";
import { generateKey, getRouterParams } from "../utils";
import { programData } from "../services/dataAccessServices";
import { ObserveRule } from "../containers";

const Observe = () => {
  const { programId } = getRouterParams();
  const program = programData.get(programId || "");
  console.log("🚀 ~ file: observe.tsx ~ line 11 ~ Observe ~ program", program);
  // TODO Need to think about how results should be updated and saved
  return program.rules.map((rule, i) => (
    <ObserveRule key={generateKey("observeRule", i)} rule={rule} />
  ));
};

export default Observe;
