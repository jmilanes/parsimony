import React from "react";

import { ObserveTarget } from "../observeTarget.container";
import { Program } from "@parsimony/types";

export const DiscreteTrial = ({ program }: { program: Program }) => {
  return <ObserveTarget target={program.targets as []} />;
};
