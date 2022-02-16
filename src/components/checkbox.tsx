import React from "react";
import ComponentsService from "../services/componentsService";

export type ICheckBoxProps = {
  key?: string;
  readOnly?: boolean;
  value: boolean;
  pathToState: string;
  title: string;
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
    <ComponentsService.Container flexDirection="row" key={key}>
      <ComponentsService.Header text={`${title}: `} size="sm" />
      <input
        type="checkbox"
        disabled={readOnly}
        checked={value}
        onChange={() => updateState(pathToState, !value)}
      />
    </ComponentsService.Container>
  );
};

export default Checkbox;
