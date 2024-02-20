import React from "react";
import { Field, Repeater, Button, Row, Col, RichText } from "../../components";
import { initialTargetData } from "../../../fixtures";

import { Program, TargetFormMetaTestIds, Target } from "@parsimony/types";
import { generateKey, removeItemByIndex } from "../../../utils";
import { InputForm } from "../../../domains/forms/form";
import { cloneDeep } from "lodash";

type TargetFormProps = {
  form: InputForm<Program>;
  readOnly?: boolean;
};

export const TargetForm = ({ form, readOnly = false }: TargetFormProps) => {
  const deleteItem = (arr: any[], index: number) => {
    form.updateData({ targets: removeItemByIndex(arr, index) as Target[] });
  };

  const updateItem = (index: number, prop: keyof Target, value: string) => {
    const copy = cloneDeep<Target[]>(form.Data.targets);
    //@ts-ignore
    copy[index][prop] = value;
    form.updateData({ targets: copy });
  };

  const target = (index: number) => {
    if (!form.Data.targets) return null;
    const target = form.Data.targets[index] as Target;
    return (
      <Row className="add-target-row" key={generateKey("target", index)}>
        <Button
          name="Delete Target"
          disabled={readOnly}
          onClick={() => deleteItem(form.Data.targets || [], index)}
          metaTestId={`${TargetFormMetaTestIds.deleteRuleBtn}-${index}`}
        />
        <Col xs={12}>
          <Field
            placeHolderText="Title"
            value={target.title}
            onChange={(value) => {
              updateItem(index, "title", value);
            }}
            readOnly={readOnly}
            metaTestId={`${TargetFormMetaTestIds.questionField}-${index}`}
          />
        </Col>
        <Col xs={12}>
          <RichText
            placeHolderText="Description"
            content={target.description}
            onChange={(value) => {
              updateItem(index, "description", value);
            }}
            readOnly={readOnly}
            metaTestId={`${TargetFormMetaTestIds.descriptionField}-${index}`}
          />
        </Col>
      </Row>
    );
  };

  return (
    <Repeater
      title="Targets"
      dataProp="targets"
      form={form}
      items={form.Data.targets || []}
      generateRow={target}
      initialData={initialTargetData}
      readOnly={readOnly}
      renderAddButton={(addFn) => {
        return (
          <Button
            type={"contained"}
            name="Add Target"
            onClick={addFn}
            metaTestId={TargetFormMetaTestIds.addRuleBtn}
          />
        );
      }}
    />
  );
};
