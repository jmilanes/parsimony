import React from "react";
import { ResultFormProps } from "./resultForm.factory";
import { Field } from "../../components";
import { ResultPageMetaTestIds } from "@parsimony/types";

export const DurationResultForm = ({ form, isReadonly }: ResultFormProps) => {
  return (
    <Field
      placeHolderText="Seconds"
      value={(form.Data.result / 1000).toString()}
      onChange={(value) => form.updateData({ result: parseInt(value) * 1000 })}
      readOnly={isReadonly}
      metaTestId={ResultPageMetaTestIds.durationTextField}
    />
  );
};
