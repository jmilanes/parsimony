import React from "react";
import { Container, Header, Col } from "../components";
import {
  createCommaSeparatedSting,
  formatFormHeader,
  generateDataTestId
} from "../utils";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MaterialSelect from "@mui/material/Select";
import { DataTestIds, UIDataTargetTypes } from "@parsimony/types/src";

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
  dataTestId: DataTestIds;
};

export const MultiSelect = ({
  readOnly,
  options,
  updateState,
  pathToState,
  values,
  title,
  dataTestId
}: IMultiSelectProps) => {
  const testId = generateDataTestId(
    UIDataTargetTypes.MultiSelector,
    dataTestId || ""
  );
  const updateSelectionsAndState = (values: unknown[]) =>
    updateState(pathToState, values);

  const FormHeader = () => {
    return (
      <Col xs={12}>
        <Header text={formatFormHeader(title)} size="sm" />
      </Col>
    );
  };

  const ReadOnlyOptions = () => {
    return (
      <Container flexDirection="row">
        <FormHeader />
        {values?.map((value: string, i: number) => (
          <p data-cy={`${testId}-multi-read-only-${i}`}>
            {createCommaSeparatedSting(value, i)}
          </p>
        ))}
      </Container>
    );
  };

  const Options = () => {
    return (
      <FormControl fullWidth>
        <InputLabel>{title}</InputLabel>
        <MaterialSelect
          data-cy={testId}
          label={title}
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
      </FormControl>
    );
  };

  return (
    <Container flexDirection="row" margin={25}>
      {readOnly ? <ReadOnlyOptions /> : <Options />}
    </Container>
  );
};
