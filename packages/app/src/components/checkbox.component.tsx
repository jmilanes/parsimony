import React from "react";
import { Container, Header } from "../components";
import MaterialSwitch from "@mui/material/Switch";

export type ICheckBoxProps = {
  key?: string;
  readOnly?: boolean;
  value: boolean;
  pathToState: string;
  title: string;
  updateState: (path: string, value: boolean) => void;
};

export const Checkbox = ({
  readOnly,
  value,
  updateState,
  pathToState,
  title,
  key
}: ICheckBoxProps) => {
  return (
    <Container flexDirection="row" key={key}>
      <Header text={`${title}: `} size="sm" />
      <MaterialSwitch
        disabled={readOnly}
        checked={value}
        onChange={() => updateState(pathToState, !value)}
      />
    </Container>
  );
};
