import React from "react";
import { Checkbox, Container, Header } from "../components";
import {
  createCommaSeparatedSting,
  generateKey,
  makeIncludedKey
} from "../utils";

export type IOptionMultiSelect = {
  name: string;
  value: string | number | boolean;
};

export type IMultiSelectProps = {
  key?: string;
  readOnly?: boolean;
  options: IOptionMultiSelect[];
  values: unknown[];
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
  title,
  key
}: IMultiSelectProps) => {
  const optionsReduced = options.reduce(makeIncludedKey(values, "name"), {});

  const [selections, updateSelections] =
    React.useState<Record<string, boolean>>(optionsReduced);

  const updateSelectionsAndState = (value: string) => {
    updateSelections({ ...selections, [value]: !selections[value] });
    const isValueSelected = values.includes(value);
    updateState(
      pathToState,
      isValueSelected ? values.filter((x) => x !== value) : [...values, value]
    );
  };

  const ReadOnlyOptions = () => {
    const filteredOptions = options.filter((item) => selections[item.name]);
    return (
      <Container flexDirection="row" key={key}>
        <Header text={title} size="sm" />
        <p>
          {filteredOptions.map((option, i) =>
            createCommaSeparatedSting(option.name, i)
          )}
        </p>
      </Container>
    );
  };

  const Options = () => {
    return (
      <div>
        <Header text={title} size="md" />
        {options.map((option, index) => (
          <Checkbox
            key={generateKey("multi-select-option", index)}
            value={selections[option.name]}
            title={option.name}
            pathToState={option.name}
            updateState={() => updateSelectionsAndState(option.name)}
          />
        ))}
      </div>
    );
  };

  return readOnly ? <ReadOnlyOptions /> : <Options />;
};

export default MultiSelect;
