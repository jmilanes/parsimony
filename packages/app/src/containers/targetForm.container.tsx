import React from "react";
import {
  Field,
  Selector,
  Checkbox,
  Repeater,
  Button,
  Row,
  Col
} from "../components";
import { initialTargetData, inputTypes, programValueTypes } from "../fixtures";

import { Program, TargetFormMetaTestIds, Target } from "@parsimony/types";
import { generateKey, removeItemByIndex } from "../utils";
import "./styles.css";

type TargetFormProps = {
  localState: Program;
  readOnly?: boolean;
  //TODO Name this better / just move to a better service
  updateState: (path: string, value: unknown) => void;
};

export const TargetForm = ({
  localState,
  readOnly = false,
  updateState
}: TargetFormProps) => {
  const deleteItem = (arr: any[], index: number, path: string) =>
    updateState(path, removeItemByIndex(arr, index));

  const target = (index: number) => {
    if (!localState.targets) return null;
    const target = localState.targets[index] as Target;
    const metaQualifier = index.toString();
    return (
      <Row className="add-target-row" key={generateKey("target", index)}>
        <Button
          name="Delete Target"
          disabled={readOnly}
          action={() => deleteItem(localState.targets || [], index, "targets")}
          metaTestId={TargetFormMetaTestIds.deleteRuleBtn}
          metaTestQualifier={metaQualifier}
        />
        <Col xs={12}>
          <Field
            placeHolderText="Title"
            pathToState={`targets[${index}].title`}
            value={target.title}
            updateState={updateState}
            readOnly={readOnly}
            metaTestId={TargetFormMetaTestIds.questionField}
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
            metaTestId={TargetFormMetaTestIds.descriptionField}
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
            metaTestId={TargetFormMetaTestIds.requiredCheckbox}
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
            metaTestId={TargetFormMetaTestIds.inputTypeSelector}
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
            metaTestId={TargetFormMetaTestIds.valueTypeSelector}
            metaTestQualifier={index.toString()}
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
            metaTestId={TargetFormMetaTestIds.addRuleBtn}
          />
        );
      }}
    />
  );
};
