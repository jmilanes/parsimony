import React from "react";

import { ObserveTarget } from "../observeTarget.container";
import { Program, TargetOption } from "@parsimony/types";
import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";

export const DiscreteTrial = ({ program }: { program: Program }) => {
  const API = Container.get(UIApi);

  return (
    <ObserveTarget
      targetOptions={program.targetOptions as TargetOption[]}
      target={program.targets as []}
      updateResultData={API.actions.observations.updatedResultsData}
      programTrials={program.trials || 1}
    />
  );
};
