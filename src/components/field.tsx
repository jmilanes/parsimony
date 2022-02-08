import React from "react";

export type IFieldProps = {
  key?: any;
  readOnly?: boolean;
  value: any;
  pathToState: string;
  placeHolderText?: string;
  updateState: (path: string, value: any) => void;
};

const Field = ({
  readOnly,
  value,
  updateState,
  pathToState,
  placeHolderText,
  key
}: IFieldProps) => {
  return readOnly ? (
    <p>{value}</p>
  ) : (
    <input
      key={key}
      placeholder={placeHolderText}
      value={value}
      onChange={(e) => updateState(pathToState, e.currentTarget.value)}
    ></input>
  );
};

export default Field;
