import { uuid } from "../utils";
import React from "react";

export type IOption = { name: string; value: string | number };
export type ISelectoProps = {
  placeHolderText: string;
  options: IOption[];
  pathToState: string;
  updateState: (path: string, value: any) => void;
  readOnly?: boolean;
  value: any;
};
const Selector = ({
  options,
  pathToState,
  updateState,
  value,
  readOnly,
  placeHolderText
}: ISelectoProps) => {
  return readOnly ? (
    <p>{value}</p>
  ) : (
    <>
      <p>{placeHolderText}</p>
      <select onChange={(e) => updateState(pathToState, e.currentTarget.value)}>
        {options.map((option) => {
          return (
            <option
              selected={option.value === value}
              key={uuid()}
              value={option.value}
            >
              {option.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Selector;
