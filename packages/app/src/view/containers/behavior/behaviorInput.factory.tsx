import React from "react";

import { Program, ProgramViewTypes } from "@parsimony/types";
import { TallyBehaviorInput } from "./inputs/tally.behavior.input";
import { TimeBehaviorInput } from "./inputs/time.behavior.input";
import { IntervalBehaviorInput } from "./inputs/interval.behavior.input";
import { isBehavior } from "../../../utils";

export const behaviorInputFactory = (program: Program) => {
  if (!isBehavior(program)) {
    console.warn(`No behavior associated with ${program.title}`);
    return null;
  }

  const behaviorInputMap = {
    [ProgramViewTypes.FrequencyBehavior]: TallyBehaviorInput,
    [ProgramViewTypes.DurationBehavior]: TimeBehaviorInput,
    [ProgramViewTypes.IntervalBehavior]: IntervalBehaviorInput
  };

  // @ts-ignore
  const Comp = behaviorInputMap[program.behavior?.type];
  return <Comp key={program.id} program={program} />;
};
