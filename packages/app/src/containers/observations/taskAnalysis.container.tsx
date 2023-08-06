import React from "react";

import { ObserveTarget } from "../observeTarget.container";
import { Program, TargetOption } from "@parsimony/types";
import { generateKey } from "../../utils";
import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";

export const TaskAnalysis = ({ program }: { program: Program }) => {
  const API = Container.get(UIApi);

  return (
    <div>
      {program.targets?.map((target, i) => {
        return target ? (
          <ObserveTarget
            targetOptions={program.targetOptions as TargetOption[]}
            key={generateKey("observeTarget", i)}
            target={target}
            updateResultData={API.actions.observations.updatedResultsData}
            programTrials={program.trials || 1}
            metaQualifierIndex={i}
          />
        ) : null;
      })}
    </div>
  );
};
