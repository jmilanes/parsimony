import React from "react";
import { Container, ReadOnly } from "./index";
import { generateMetaTestId } from "../../utils";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MaterialSelect from "@mui/material/Select";
import { MetaTestIds, UIMetaTargetTypes } from "@parsimony/types";
import { CONTAINER_INPUT_MARGIN } from "../../constants";

export type IOptionMultiSelect = {
  name: string;
  value: string | number;
};

export type IMultiSelectProps = {
  key?: string;
  readOnly?: boolean;
  options: IOptionMultiSelect[];
  values?: string[];
  title: string;
  onChange: (value: string[]) => void;
  metaTestId: MetaTestIds;
  metaTestQualifier?: string;
};

export const MultiSelect = ({
  readOnly,
  options,
  onChange,
  values,
  title,
  metaTestId,
  metaTestQualifier
}: IMultiSelectProps) => {
  const metaId = generateMetaTestId(
    UIMetaTargetTypes.Selector,
    metaTestId,
    metaTestQualifier
  );
  const updateSelectionsAndState = (values: string[]) => onChange(values);

  const Options = () => {
    return (
      <FormControl fullWidth>
        <InputLabel>{title}</InputLabel>
        <MaterialSelect
          data-test-id={metaId}
          label={title}
          multiple
          value={values}
          onChange={(e) => {
            updateSelectionsAndState(e.target.value as string[]);
          }}
        >
          {options.map((opt) => (
            <MenuItem
              key={opt.name}
              value={opt.value}
              data-test-id={`${metaId}-option-${opt.value}`}
            >
              {opt.name}
            </MenuItem>
          ))}
        </MaterialSelect>
      </FormControl>
    );
  };

  return (
    <Container
      flexDirection="row"
      margin={readOnly ? 0 : CONTAINER_INPUT_MARGIN}
    >
      {readOnly ? (
        <ReadOnly
          metaTestId={metaId}
          value={values?.join(", ")}
          title={title}
        />
      ) : (
        <Options />
      )}
    </Container>
  );
};
