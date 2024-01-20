import React from "react";
import { Container, ReadOnly } from "./index";
import { formatFormHeader, generateMetaTestId } from "../../utils";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MetaTestIds, Maybe, UIMetaTargetTypes } from "@parsimony/types";
import MenuItem from "@mui/material/MenuItem";
import MaterialSelect from "@mui/material/Select";
import { CONTAINER_INPUT_MARGIN } from "../../constants";

export type IOption = { name: string; value: string | number };

export type ISelectorProps = {
  title: string;
  options: IOption[];
  onChange: (value: string | number) => void;
  readOnly?: boolean;
  value?: Maybe<string | number>;
  isNumber?: boolean;
  key?: string;
  metaTestId: string;
};

export const Selector = ({
  options,
  onChange,
  value,
  readOnly,
  title,
  key,
  isNumber,
  metaTestId
}: ISelectorProps) => {
  const processValue = (value: string | number) =>
    isNumber && typeof value === "string" ? parseInt(value) : value;

  const Options = () => (
    <FormControl fullWidth>
      <InputLabel>{title}</InputLabel>
      <MaterialSelect
        inputProps={{ "data-testid": `${metaTestId}-input` }}
        label={title}
        value={value || "Please select an option"}
        data-testid={metaTestId}
        onChange={({ target: { value } }) => {
          onChange(processValue(value));
        }}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.name}
            value={opt.value}
            data-testid={`${metaTestId}-option-${opt.value}`}
          >
            {opt.name}
          </MenuItem>
        ))}
      </MaterialSelect>
    </FormControl>
  );

  return (
    <Container
      flexDirection="row"
      key={key}
      margin={readOnly ? 0 : CONTAINER_INPUT_MARGIN}
    >
      {readOnly ? (
        <ReadOnly metaTestId={metaTestId} value={value} title={title} />
      ) : (
        <Options />
      )}
    </Container>
  );
};
