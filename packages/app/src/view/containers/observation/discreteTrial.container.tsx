import React from "react";

import { ObserveTarget } from "./observeTarget.container";
import { DiscreteTrial } from "@parsimony/types";

export const DiscreteTrialComp = ({ program }: { program: DiscreteTrial }) => {
  return <ObserveTarget target={program.targets as []} />;
};
