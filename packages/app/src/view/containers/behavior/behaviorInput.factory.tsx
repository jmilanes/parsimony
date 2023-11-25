import React from "react";

import { BehaviorType, Program } from "@parsimony/types/dist";
import { TallyBehaviorInput } from "./inputs/tally.behavior.input";
import { TimeBehaviorInput } from "./inputs/time.behavior.input";
import { IntervalBehaviorInput } from "./inputs/interval.behavior.input";

export const behaviorInputFactory = (program: Program) => {
  if (!program.behavior?.type) {
    console.warn(`No behavior associated with ${program.title}`);
    return;
  }

  const behaviorInputMap: Record<BehaviorType, any> = {
    [BehaviorType.Frequency]: TallyBehaviorInput,
    [BehaviorType.Duration]: TimeBehaviorInput,
    [BehaviorType.Interval]: IntervalBehaviorInput
  };

  const Comp = behaviorInputMap[program.behavior?.type];
  return <Comp key={program.id} program={program} />;
};
