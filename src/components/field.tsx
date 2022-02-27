import React from "react";
import ComponentsService from "../services/componentsService";

export type IFieldProps = {
  key?: string;
  readOnly?: boolean;
  value?: string;
  pathToState: string;
  placeHolderText: string;
  updateState: (path: string, value: string) => void;
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
    <ComponentsService.Container flexDirection="column" key={key}>
      <ComponentsService.Header text={placeHolderText} size="sm" />
      <p>{value}</p>
    </ComponentsService.Container>
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
