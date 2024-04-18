import React from "react";
import { ResultFormProps } from "./resultForm.factory";
import { Selector } from "../../components";
import {
  DiscreteTrial,
  Program,
  Result,
  ResultPageMetaTestIds,
  TaskAnalysis
} from "@parsimony/types";
import { round } from "lodash";
import {
  calculateAverage,
  calculateCompletenessForTargetResults,
  clone
} from "../../../utils";
import { InputForm } from "../../../domains/forms/form";

export type TrialResultFormProps = {
  program: TaskAnalysis | DiscreteTrial;
  form: InputForm<Result>;
  isReadonly: boolean;
};

export const TrialResultForm = ({
  form,
  isReadonly,
  program
}: TrialResultFormProps) => {
  const programTargetIndex = program.targetOptions?.findIndex(
    (x) => !!x?.target
  );

  const findValueIndex = (v: string) => {
    return program.targetOptions?.findIndex((x) => x?.name === v) || 0;
  };

  const updateForm = ({
    value,
    targetIndex,
    resultIndex
  }: {
    value: string;
    targetIndex: number;
    resultIndex: number;
  }) => {
    //TODO: Once you have better types this should work!
    const copy = clone(form.Data) as Result;
    //@ts-ignore
    const foundResult = copy?.data[targetIndex].targetResults[resultIndex];
    //@ts-ignore
    foundResult.option.name = value;
    //@ts-ignore
    foundResult.completed = findValueIndex(value) >= programTargetIndex;
    //@ts-ignore
    copy.data[targetIndex].targetCompleteness =
      calculateCompletenessForTargetResults(
        //@ts-ignore
        copy?.data[targetIndex].targetResults
      );

    copy.programCompleteness = calculateAverage(
      copy.data || [],
      "targetCompleteness"
    );
    // then recalculate target and total
    form.updateData(copy);
  };

  const EditMode = () => {
    return form.Data.data.map((target: any, targetIndex: number) => {
      return (
        <div
          key={`target-result-form-${targetIndex}`}
          className="targetResultEditForm"
        >
          <p>{(program.targets || [])[targetIndex]?.title}</p>
          <p>Target Completeness: {round(target.targetCompleteness, 2)}</p>
          <p>{(program.targets || [])[targetIndex]?.description}</p>
          <div>
            {target.targetResults.map((result: any, resultIndex: number) => {
              return (
                <div
                  key={`target-result-selector-${targetIndex}-${resultIndex}`}
                >
                  <Selector
                    title={`Trial ${result.trial}`}
                    onChange={(value) => {
                      updateForm({
                        value: value as string,
                        resultIndex,
                        targetIndex
                      });
                    }}
                    value={result.option.name}
                    options={
                      program.targetOptions?.map((x) => ({
                        name: x?.name || "",
                        value: x?.name || ""
                      })) || []
                    }
                    metaTestId={ResultPageMetaTestIds.trialSelector}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <h4>Program Completeness: {round(form.Data.programCompleteness, 2)}</h4>
      {!isReadonly && <EditMode />}
    </>
  );
};
