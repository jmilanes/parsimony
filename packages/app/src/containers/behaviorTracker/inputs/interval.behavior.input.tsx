import React from "react";

import { BehaviorTracker, Program } from "@parsimony/types";
import { Button, Icon } from "../../../components";

export const IntervalBehaviorInput = (program: Program) => {
  return (
    <li key={program.id}>
      {program.title}{" "}
      <Button
        metaTestId={BehaviorTracker.startInterval}
        name="Interval"
        action={() => console.log("submit result")}
        icon={<Icon.BehaviorInterval />}
      />
    </li>
  );
};
