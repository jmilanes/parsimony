import {
  ObservationMetaTestIds,
  Target,
  TargetResultOption
} from "@parsimony/types";
import { compileStyles, generateKey } from "../../../utils";
import { Button } from "../../components";
import React from "react";
import { Container as DI } from "typedi";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

export const ActiveTarget = ({
  target,
  index
}: {
  target: Target;
  index: number;
}) => {
  const API = DI.get(UIApi);

  const { program } = API.actions.observations.state();
  const { currentStep, completeness } = API.actions.observations.getTargetState(
    target.id || ""
  );

  const isTaskAnalysis = API.actions.observations.isTaskAnalysis();
  const selectedId = API.actions.observations.getSelectedByTargetState(
    target.id || ""
  );

  return (
    <div
      className={compileStyles({
        activeObservationTarget: true,
        group: !isTaskAnalysis
      })}
    >
      <div className="content">
        <div className="trial">
          {isTaskAnalysis && (
            <>
              <h3>
                {target.title} Trial: {currentStep}
              </h3>
              <h4 className="completeness">
                Completeness:{" "}
                {API.actions.observations.getTargetCompleteness(
                  target.id || ""
                )}
                %
              </h4>
            </>
          )}
          {!isTaskAnalysis && <h3>{target.title}</h3>}
        </div>
        {currentStep > 1 && (
          <Button
            name="Back"
            action={() =>
              API.actions.observations.decrementStep(target.id || "")
            }
            metaTestId={ObservationMetaTestIds.revertStepBtn}
          />
        )}
        {isTaskAnalysis && (
          <Button
            name="Close"
            action={() =>
              API.actions.observations.updateTargetState(target.id || "", {
                active: false
              })
            }
            metaTestId={ObservationMetaTestIds.closeRuleBtn}
          />
        )}
      </div>

      <div className="promptBtnContainer">
        {program?.targetOptions?.map((option, i) => (
          <Button
            key={generateKey("optionButton", i)}
            name={option?.name as string}
            action={() =>
              API.actions.observations.selectOption(
                option as TargetResultOption,
                target
              )
            }
            type={selectedId === option?.id ? "contained" : "outlined"}
            metaTestId={ObservationMetaTestIds.ruleOptionSelectBtn}
            metaTestQualifier={`target-${index.toString()}-prompt-${i}`}
          />
        ))}
      </div>
    </div>
  );
};
