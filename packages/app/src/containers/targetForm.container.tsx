import React from "react";
import {
  Field,
  Selector,
  Checkbox,
  Header,
  Repeater,
  Button,
  Row,
  Col
} from "../components";
import {
  initialTargetData,
  inputTypes,
  programValueTypes,
  promptsByType
} from "../fixtures";
import { message } from "antd";

import {
  Program,
  PromptTypes,
  RulesFormMetaTestIds,
  Target,
  TargetOption
} from "@parsimony/types";
import { generateKey, removeItemByIndex } from "../utils";
import "./styles.css";

type TargetFormProps = {
  localState: Program;
  readOnly?: boolean;
  //TODO Name this better / just move to a better service
  updateState: (path: string, value: unknown) => void;
};

const prefilledPromptBtnMetaTestIds = {
  [PromptTypes.Verbal]: RulesFormMetaTestIds.preSelectedVerbalPromptsBtn,
  [PromptTypes.Physical]: RulesFormMetaTestIds.preSelectedPhysicalPromptsBtn,
  [PromptTypes.Time]: RulesFormMetaTestIds.preSelectedTimePromptsBtn
};

export const TargetForm = ({
  localState,
  readOnly = false,
  updateState
}: TargetFormProps) => {
  const deleteItem = (arr: any[], index: number, path: string) =>
    updateState(path, removeItemByIndex(arr, index));

  const setTargetOption = (options: TargetOption[], targetName: string) =>
    options?.map((option) => {
      option?.name === targetName
        ? (option.target = true)
        : delete option?.target;
      return option;
    });

  const option = (targetIndex: number) => (optionIndex: number) => {
    if (!localState.targets) return null;
    const target = localState.targets[targetIndex] as Target;
    if (!target.options) return null;

    const option = target.options[optionIndex] as TargetOption;
    // TODO Change when you change test ids
    const metaTestQualifier = `rule-${targetIndex}-prompt-${optionIndex}`;
    const setOptionToTarget = () =>
      updateState(
        `targets[${targetIndex}].options`,
        setTargetOption(target.options as TargetOption[], option.name || "")
      );
    const removeOption = () => {
      if (option.target) {
        message.error("You can't delete the target program!");
        return;
      }
      deleteItem(
        target.options || [],
        optionIndex,
        `targets[${targetIndex}].options`
      );
    };

    return (
      <Row key={generateKey("option", optionIndex)}>
        <Col xs={4}>
          <Field
            placeHolderText="Prompt Name"
            pathToState={`targets[${targetIndex}].options[${optionIndex}].name`}
            value={option.name}
            updateState={updateState}
            readOnly={readOnly}
            metaTestId={RulesFormMetaTestIds.promptNameField}
            metaTestQualifier={metaTestQualifier}
          />
        </Col>
        <Col xs={6}>
          <Button
            disabled={readOnly}
            name="Delete Prompt"
            action={removeOption}
            metaTestId={RulesFormMetaTestIds.deletePromptBtn}
            metaTestQualifier={metaTestQualifier}
          />
          <Button
            disabled={readOnly}
            name="Set to Target"
            action={setOptionToTarget}
            metaTestId={RulesFormMetaTestIds.setToTargetBtn}
            metaTestQualifier={metaTestQualifier}
          />
        </Col>
        <Col xs={2}>{option.target ? <p>Target Prompt</p> : null}</Col>
      </Row>
    );
  };

  const target = (index: number) => {
    const generateOption = option(index);
    if (!localState.targets) return null;
    const target = localState.targets[index] as Target;
    const metaQualifier = index.toString();
    return (
      <Row className="add-target-row" key={generateKey("target", index)}>
        <Button
          name="Delete Target"
          disabled={readOnly}
          action={() => deleteItem(localState.targets || [], index, "targets")}
          metaTestId={RulesFormMetaTestIds.deleteRuleBtn}
          metaTestQualifier={metaQualifier}
        />
        <Col xs={12}>
          <Field
            placeHolderText="Title"
            pathToState={`targets[${index}].title`}
            value={target.title}
            updateState={updateState}
            readOnly={readOnly}
            metaTestId={RulesFormMetaTestIds.questionField}
            metaTestQualifier={metaQualifier}
          />
        </Col>
        <Col xs={12}>
          <Field
            placeHolderText="Description"
            pathToState={`targets[${index}].description`}
            value={target.description}
            updateState={updateState}
            readOnly={readOnly}
            metaTestId={RulesFormMetaTestIds.descriptionField}
            metaTestQualifier={metaQualifier}
          />
        </Col>

        <Col xs={12}>
          <Checkbox
            title="Required"
            pathToState={`targets[${index}].required`}
            value={!!target.required}
            updateState={updateState}
            readOnly={readOnly}
            metaTestId={RulesFormMetaTestIds.requiredCheckbox}
            metaTestQualifier={metaQualifier}
          />
        </Col>
        <Col xs={12}>
          <Selector
            title="Input Type"
            pathToState={`targets[${index}].inputType`}
            value={target.inputType}
            options={inputTypes}
            updateState={updateState}
            readOnly={readOnly}
            metaTestId={RulesFormMetaTestIds.inputTypeSelector}
            metaTestQualifier={metaQualifier}
          />
        </Col>
        <Col xs={12}>
          <Selector
            title="Value Type"
            pathToState={`targets[${index}].valueType`}
            value={target.valueType}
            options={programValueTypes}
            updateState={updateState}
            readOnly={readOnly}
            metaTestId={RulesFormMetaTestIds.valueTypeSelector}
            metaTestQualifier={index.toString()}
          />
        </Col>

        <Col xs={12} hidden={readOnly}>
          <Header text="Pre-filled Prompts:" size="sm" />
          {Object.entries(promptsByType).map(([key, value]) => {
            return (
              <Button
                key={generateKey("pre-filled-prompt-button", key)}
                name={key}
                action={() => updateState(`targets[${index}].options`, value)}
                metaTestId={prefilledPromptBtnMetaTestIds[key as PromptTypes]}
                metaTestQualifier={metaQualifier}
              />
            );
          })}
        </Col>

        {/* TODO Prob would be better to pass button it self in to the repeater*/}
        <Col xs={12}>
          <Repeater
            title="Target Options"
            items={target.options || []}
            pathToState={`targets[${index}].options`}
            updateState={updateState}
            generateRow={generateOption}
            initialData={{ name: "", target: target.options?.length === 0 }}
            readOnly={readOnly}
            renderAddButton={(addFn) => {
              return (
                <Button
                  name="Add Target Option"
                  action={addFn}
                  metaTestId={RulesFormMetaTestIds.addPromptBtn}
                  metaTestQualifier={metaQualifier}
                />
              );
            }}
          />
        </Col>
      </Row>
    );
  };

  return (
    <Repeater
      title="Targets"
      items={localState.targets || []}
      pathToState={`targets`}
      updateState={updateState}
      generateRow={target}
      initialData={initialTargetData}
      readOnly={readOnly}
      renderAddButton={(addFn) => {
        return (
          <Button
            name="Add Target"
            action={addFn}
            metaTestId={RulesFormMetaTestIds.addRuleBtn}
          />
        );
      }}
    />
  );
};
