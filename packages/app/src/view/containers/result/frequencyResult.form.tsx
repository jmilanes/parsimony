import React from "react";
import { ResultFormProps } from "./resultForm.factory";
import { Field } from "../../components";
import { ResultPageMetaTestIds } from "@parsimony/types";

export const FrequencyResultForm = ({ form, isReadonly }: ResultFormProps) => {
  return (
    <Field
      placeHolderText="Occurances"
      value={form.Data.behaviorData.result.toString()}
      onChange={(value) =>
        form.updateData({ behaviorData: { result: parseInt(value) || 0 } })
      }
      readOnly={isReadonly}
      metaTestId={ResultPageMetaTestIds.frequencyTextField}
    />
  );
};
