import React from "react";

import { ObserveTarget } from "./observeTarget.container";
import { Program } from "@parsimony/types/dist";

export const DiscreteTrial = ({ program }: { program: Program }) => {
  return <ObserveTarget target={program.targets as []} />;
};
