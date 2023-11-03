import React from "react";
import { Field, Repeater, Button, Row, Col, RichText } from "../components";
import { initialTargetData } from "../../fixtures";

import { Program, TargetFormMetaTestIds, Target } from "@parsimony/types/dist";
import { generateKey, removeItemByIndex } from "../../utils";
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
          <RichText
            placeHolderText="Description"
            pathToState={`targets[${index}].description`}
            content={target.description}
            updateState={updateState}
            readOnly={readOnly}
            metaTestId={TargetFormMetaTestIds.descriptionField}
            metaTestQualifier={metaQualifier}
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
            type={"contained"}
            name="Add Target"
            action={addFn}
            metaTestId={TargetFormMetaTestIds.addRuleBtn}
          />
        );
      }}
    />
  );
};
