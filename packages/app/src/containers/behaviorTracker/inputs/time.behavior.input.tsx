import React from "react";

import { BehaviorTracker, Program } from "@parsimony/types";
import { Button, Icon } from "../../../components";

export const TimeBehaviorInput = (program: Program) => {
  return (
    <li key={program.id}>
      {program.title}{" "}
      <Button
        metaTestId={BehaviorTracker.startTimer}
        name="Timer"
        action={() => console.log("submit result")}
        icon={<Icon.BehaviorTime />}
      />
    </li>
  );
};
