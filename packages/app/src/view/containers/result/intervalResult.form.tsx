import React from "react";
import { ResultFormProps } from "./resultForm.factory";
import { Field } from "../../components";
import { ResultPageMetaTestIds } from "@parsimony/types";

export const IntervalResultForm = ({ form, isReadonly }: ResultFormProps) => {
  return (
    <Field
      placeHolderText="Occurance Percentage"
      value={form.Data.result.toString()}
      onChange={(value) => form.updateData({ result: parseInt(value) || 0 })}
      readOnly={isReadonly}
      metaTestId={ResultPageMetaTestIds.frequencyTextField}
    />
  );
};
