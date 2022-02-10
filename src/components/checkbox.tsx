import React from "react";

export type ICheckBoxProps = {
  key?: string;
  readOnly?: boolean;
  value: boolean;
  pathToState: string;
  title?: string;
  updateState: (path: string, value: boolean) => void;
};

const Checkbox = ({
  readOnly,
  value,
  updateState,
  pathToState,
  title,
  key
}: ICheckBoxProps) => {
  return (
    <>
      <p>{title}</p>
      <input
        type="checkbox"
        disabled={readOnly}
        checked={value}
        onChange={() => updateState(pathToState, !value)}
      ></input>
    </>
  );
};

export default Checkbox;
