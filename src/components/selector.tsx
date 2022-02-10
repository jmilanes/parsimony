import { uuid } from "../utils";
import React from "react";

export type IOption = { name: string; value: string | number };
export type ISelectorProps = {
  title?: string;
  options: IOption[];
  pathToState: string;
  updateState: (path: string, value: string) => void;
  readOnly?: boolean;
  value?: string | number;
};
const Selector = ({
  options,
  pathToState,
  updateState,
  value,
  readOnly,
  title
}: ISelectorProps) => {
  return readOnly ? (
    <p>{value}</p>
  ) : (
    <>
      <p>{title}</p>
      <select
        value={value}
        onChange={(e) => updateState(pathToState, e.currentTarget.value)}
      >
        {options.map((option) => {
          return (
            <option key={uuid()} value={option.value}>
              {option.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Selector;
