import React from "react";
import { Checkbox } from ".";
import { generateKey } from "../utils";

export type IOptionMultiSelect = {
  name: string;
  value: string | number | boolean;
};

export type IMultiSelectProps = {
  key?: string;
  readOnly?: boolean;
  items: IOptionMultiSelect[];
  values: unknown[];
  pathToState: string;
  title?: string;
  updateState: (path: string, value: unknown) => void;
};

const MultiSelect = ({
  readOnly,
  items,
  updateState,
  pathToState,
  values,
  title,
  key
}: IMultiSelectProps) => {
  const itemsReduced = items.reduce((acc: Record<string, any>, curr) => {
    acc[curr.name] = values.includes(curr.name);
    return acc;
  }, {});

  const [selections, updateSelections] =
    React.useState<Record<string, boolean>>(itemsReduced);

  const updateSelectionsAndState = (value: string) => {
    updateSelections({ ...selections, [value]: !selections[value] });
    const isValueSelected = values.includes(value);
    updateState(
      pathToState,
      isValueSelected ? values.filter((x) => x !== value) : [...values, value]
    );
  };

  return (
    <>
      <p>{title}</p>
      {items.map((item, index) => {
        return (
          <Checkbox
            key={generateKey("multi-select-option", index)}
            value={selections[item.name]}
            title={item.name}
            pathToState={item.name}
            updateState={() => updateSelectionsAndState(item.name)}
          />
        );
      })}
    </>
  );
};

export default MultiSelect;
