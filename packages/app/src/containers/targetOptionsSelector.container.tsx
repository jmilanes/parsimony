// @ts-ignore
import React from "react";
import {
  Field,

  Repeater,
  Button,
  Row,
  Col, Header
} from "../components";

import { message } from "antd";

import {
  PromptTypes,
  TargetFormMetaTestIds,
  TargetOption
} from "@parsimony/types";

import { generateKey, removeItemByIndex } from "../utils";
import "./styles.css";
import { promptsByType } from "../fixtures";

type TargetOptionSelectorProps = {
  targetOptions: TargetOption[];
  readOnly?: boolean;
  updateState: (path: string, value: unknown) => void;
};

const prefilledPromptBtnMetaTestIds = {
  [PromptTypes.Verbal]: TargetFormMetaTestIds.preSelectedVerbalPromptsBtn,
  [PromptTypes.Physical]: TargetFormMetaTestIds.preSelectedPhysicalPromptsBtn,
  [PromptTypes.Time]: TargetFormMetaTestIds.preSelectedTimePromptsBtn
};

export const TargetOptionSelector = ({
                                       targetOptions,
                                       readOnly = false,
                                       updateState
                                     }: TargetOptionSelectorProps) => {
  const deleteItem = (arr: any[], index: number, path: string) =>
    updateState(path, removeItemByIndex(arr, index));

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
      updateState(
        `targetOptions`,
        setTargetOption(targetOptions as TargetOption[], option.name || "")
      );
    const removeOption = () => {
      if (option.target) {
        message.error("You can't delete the target program!");
        return;
      }
      deleteItem(
        targetOptions || [],
        optionIndex,
        `targetOptions`
      );
    };

    return (
      <Row key={generateKey("option", optionIndex)}>
        <Col xs={4}>
          <Field
            placeHolderText="Prompt Name"
            pathToState={`targetOptions[${optionIndex}].name`}
            value={option.name}
            updateState={updateState}
            readOnly={readOnly}
            metaTestId={TargetFormMetaTestIds.promptNameField}
            metaTestQualifier={metaTestQualifier}
          />
        </Col>
        <Col xs={6}>
          <Button
            disabled={readOnly}
            name="Delete Prompt"
            action={removeOption}
            metaTestId={TargetFormMetaTestIds.deletePromptBtn}
            metaTestQualifier={metaTestQualifier}
          />
          <Button
            disabled={readOnly}
            name="Set to Target"
            action={setOptionToTarget}
            metaTestId={TargetFormMetaTestIds.setToTargetBtn}
            metaTestQualifier={metaTestQualifier}
          />
        </Col>
        <Col xs={2}>{option.target ? <p>Target Prompt</p> : null}</Col>
      </Row>
    );
  };

  return <>
    <Row>
      <Col xs={12} hidden={readOnly}>
        <Header text="Pre-filled Prompts:" size="sm" />
        {Object.entries(promptsByType).map(([key, value]) => {
          return (
            <Button
              key={generateKey("pre-filled-prompt-button", key)}
              name={key}
              action={() => updateState(`targetOptions`, value)}
              metaTestId={prefilledPromptBtnMetaTestIds[key as PromptTypes]}
            />
          );
        })}
      </Col>
    </Row>
    <Row>
      <Repeater
        title="Target Options"
        items={targetOptions || []}
        pathToState={`targetOptions`}
        updateState={updateState}
        generateRow={generateOption}
        initialData={{ name: "", target: targetOptions?.length === 0 }}
        readOnly={readOnly}
        renderAddButton={(addFn) => {
          return (
            <Button
              name="Add Target Option"
              action={addFn}
              metaTestId={TargetFormMetaTestIds.addPromptBtn}
            />
          );
        }}
      />
    </Row>
  </>;

};
