import React from "react";

import { ObserveTarget } from "./observeTarget.container";
import { TaskAnalysis } from "@parsimony/types";
import { compileStyles, generateKey } from "../../../utils";
import { Container } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

export const TaskAnalysisComp = ({ program }: { program: TaskAnalysis }) => {
  const API = Container.get(UIApi);
  return (
    <div
      className={compileStyles({
        taskAnalysisContainer: true,
        backwardChain: API.actions.observations.isBackwardChain()
      })}
    >
      {program.targets?.map((target, i) => {
        return target ? (
          <ObserveTarget
            key={generateKey("observeTarget", i)}
            target={target}
            index={i}
          />
        ) : null;
      })}
    </div>
  );
};
