import React from "react";

import { ObserveTarget } from "../observeTarget.container";
import { Program, TargetOption } from "@parsimony/types";
import { generateKey } from "../../utils";
import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";

export const TaskAnalysis = ({ program }: { program: Program }) => {
  return (
    <div>
      {program.targets?.map((target, i) => {
        return target ? (
          <ObserveTarget
            key={generateKey("observeTarget", i)}
            target={target}
            metaQualifierIndex={i}
          />
        ) : null;
      })}
    </div>
  );
};
