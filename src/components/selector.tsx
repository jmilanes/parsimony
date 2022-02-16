import { uuid } from "../utils";
import React from "react";
import ComponentsService from "../services/componentsService";
import { generateKey } from "../utils";

export type IOption = { name: string; value: string | number };
export type ISelectorProps = {
  title: string;
  options: IOption[];
  pathToState: string;
  updateState: (path: string, value: string) => void;
  readOnly?: boolean;
  value?: string | number;
  key?: string;
};

const Selector = ({
  options,
  pathToState,
  updateState,
  value,
  readOnly,
  title,
  key
}: ISelectorProps) => {
  const ReadOnlyOption = () => (
    <>
      <ComponentsService.Header text={title} size="sm" />
      <p>{value}</p>
    </>
  );

  const Options = () => (
    <>
      <ComponentsService.Header text={title} size="sm" />
      <select
        value={value}
        onChange={(e) => updateState(pathToState, e.currentTarget.value)}
      >
        {options.map((option, i) => (
          <option key={generateKey("select-option", i)} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );

  return (
    <ComponentsService.Container flexDirection="row" key={key}>
      {readOnly ? <ReadOnlyOption /> : <Options />}
    </ComponentsService.Container>
  );
};

export default Selector;
