// @ts-ignore
import React from "react";
import { Field, Repeater, Button, Row, Col, Header } from "../../components";

import { message } from "antd";

import {
  Program,
  PromptTypes,
  Target,
  TargetFormMetaTestIds,
  TargetOption
} from "@parsimony/types";

import { generateKey, removeItemByIndex } from "../../../utils";
import { promptsByType } from "../../../fixtures";
import { InputForm } from "../../../domains/forms/form";
import { cloneDeep } from "lodash";

type TargetOptionSelectorProps = {
  form: InputForm<Program>;
  targetOptions: TargetOption[];
  readOnly?: boolean;
};

const prefilledPromptBtnMetaTestIds = {
  [PromptTypes.Verbal]: TargetFormMetaTestIds.preSelectedVerbalPromptsBtn,
  [PromptTypes.Physical]: TargetFormMetaTestIds.preSelectedPhysicalPromptsBtn,
  [PromptTypes.Duration]: TargetFormMetaTestIds.preSelectedTimePromptsBtn
};

export const TargetOptionSelector = ({
  form,
  targetOptions,
  readOnly = false
}: TargetOptionSelectorProps) => {
  const deleteItem = (arr: any[], index: number) => {
    form.updateData({
      targetOptions: removeItemByIndex(arr, index) as TargetOption[]
    });
  };

  const updateItem = (
    index: number,
    prop: keyof TargetOption,
    value: string
  ) => {
    const copy = cloneDeep<Target[]>(form.Data.targets);
    //@ts-ignore
    copy[index][prop] = value;
    form.updateData({ targets: copy });
  };

  const setTargetOption = (options: TargetOption[], targetName: string) => {
    if (!targetName) {
      message.error("No target name provided!");
      return options;
    }
    return options?.map((option) => {
      option?.name === targetName
        ? (option.target = true)
        : delete option?.target;
      return option;
    });
  };

  const generateOption = (optionIndex: number) => {
    const option = targetOptions[optionIndex] as TargetOption;
    const metaTestQualifier = `target-option-${optionIndex}`;

    const setOptionToTarget = () =>
      form.updateData({
        targetOptions: setTargetOption(
          targetOptions as TargetOption[],
          option.name || ""
        )
      });
    const removeOption = () => {
      if (option.target) {
        message.error("You can't delete the target program!");
        return;
      }
      deleteItem(targetOptions || [], optionIndex);
    };

    return (
      <div className="flex-row" key={generateKey("option", optionIndex)}>
        <div>
          <Field
            placeHolderText="Prompt Name"
            value={option.name}
            onChange={(value) => {
              updateItem(optionIndex, "name", value);
            }}
            readOnly={readOnly}
            metaTestId={TargetFormMetaTestIds.promptNameField}
            metaTestQualifier={metaTestQualifier}
          />
        </div>
        <div>
          <Button
            disabled={readOnly}
            name="Delete Prompt"
            onClick={removeOption}
            metaTestId={TargetFormMetaTestIds.deletePromptBtn}
            metaTestQualifier={metaTestQualifier}
          />
          <Button
            disabled={readOnly}
            name="Set to Target"
            onClick={setOptionToTarget}
            metaTestId={TargetFormMetaTestIds.setToTargetBtn}
            metaTestQualifier={metaTestQualifier}
          />
        </div>
        <Col xs={2}>{option.target ? <p>Target Prompt</p> : null}</Col>
      </div>
    );
  };

  return (
    <>
      <div className="flex-row spaceBetween">
        <Header text="Pre-filled Prompts:" size="sm" />
        <div>
          {Object.entries(promptsByType).map(([key, value]) => {
            return (
              <Button
                key={generateKey("pre-filled-prompt-button", key)}
                name={key}
                onClick={() => form.updateData({ targetOptions: value })}
                metaTestId={prefilledPromptBtnMetaTestIds[key as PromptTypes]}
              />
            );
          })}
        </div>
      </div>
      <div className={"add-form-spacer"}>
        <Repeater
          form={form}
          title="Target Options"
          items={targetOptions || []}
          generateRow={generateOption}
          initialData={{ name: "", target: targetOptions?.length === 0 }}
          readOnly={readOnly}
          renderAddButton={(addFn) => {
            return (
              <Button
                type={"contained"}
                name="Add Target Option"
                onClick={addFn}
                metaTestId={TargetFormMetaTestIds.addPromptBtn}
              />
            );
          }}
        />
      </div>
    </>
  );
};
