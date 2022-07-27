import { Select } from "antd";
import React from "react";
import { Container, Header } from "../components";
import { createCommaSeparatedSting, formatFormHeader } from "../utils";

const { Option } = Select;

export type IOptionMultiSelect = {
  name: string;
  value: string | number;
};

export type IMultiSelectProps = {
  key?: string;
  readOnly?: boolean;
  options: IOptionMultiSelect[];
  values: string[];
  pathToState: string;
  title: string;
  updateState: (path: string, value: unknown) => void;
};

const MultiSelect = ({
  readOnly,
  options,
  updateState,
  pathToState,
  values,
  title
}: IMultiSelectProps) => {
  const updateSelectionsAndState = (values: unknown[]) => {
    updateState(pathToState, values);
  };

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
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          defaultValue={values as string[]}
          onChange={(value) => updateSelectionsAndState(value)}
        >
          {options.map(({ value, name }) => (
            <Option value={value} key={name}>
              {name}
            </Option>
          ))}
        </Select>
      </Container>
    );
  };
  Select;

  return readOnly ? <ReadOnlyOptions /> : <Options />;
};

export default MultiSelect;
