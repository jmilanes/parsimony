import React from "react";
import { Container, Header } from "../components";
import { createCommaSeparatedSting, formatFormHeader } from "../utils";
import MenuItem from "@mui/material/MenuItem";
import MaterialSelect from "@mui/material/Select";

export type IOptionMultiSelect = {
  name: string;
  value: string | number;
};

export type IMultiSelectProps = {
  key?: string;
  readOnly?: boolean;
  options: IOptionMultiSelect[];
  values?: string[];
  pathToState: string;
  title: string;
  updateState: (path: string, value: unknown) => void;
};

export const MultiSelect = ({
  readOnly,
  options,
  updateState,
  pathToState,
  values,
  title
}: IMultiSelectProps) => {
  const updateSelectionsAndState = (values: unknown[]) =>
    updateState(pathToState, values);

  const FormHeder = () => <Header text={formatFormHeader(title)} size="sm" />;

  const ReadOnlyOptions = () => {
    return (
      <Container flexDirection="row">
        <FormHeder />
        <p>
          {values?.map((value: string, i: number) =>
            createCommaSeparatedSting(value, i)
          )}
        </p>
      </Container>
    );
  };

  const Options = () => {
    return (
      <Container flexDirection="row">
        <FormHeder />
        <MaterialSelect
          multiple
          value={values}
          onChange={(e) => {
            updateSelectionsAndState(e.target.value as string[]);
          }}
        >
          {options.map((opt) => (
            <MenuItem key={opt.name} value={opt.value}>
              {opt.name}
            </MenuItem>
          ))}
        </MaterialSelect>
      </Container>
    );
  };

  return readOnly ? <ReadOnlyOptions /> : <Options />;
};
