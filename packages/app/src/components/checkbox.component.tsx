import React from "react";
import { Container, Header } from "../components";
import MaterialSwitch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

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
      <FormControlLabel
        disabled={readOnly}
        control={
          <MaterialSwitch
            checked={value}
            onChange={() => updateState(pathToState, !value)}
          />
        }
        label={title}
      ></FormControlLabel>
    </Container>
  );
};
