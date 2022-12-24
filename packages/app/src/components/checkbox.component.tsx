import React from "react";
import { Container, Header } from "../components";
import MaterialSwitch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { generateDataTestId } from "../utils";
import { DataTestIds, UIDataTargetTypes } from "@parsimony/types/src";

export type ICheckBoxProps = {
  key?: string;
  readOnly?: boolean;
  value: boolean;
  pathToState: string;
  title: string;
  updateState: (path: string, value: boolean) => void;
  dataTestId: DataTestIds;
};

export const Checkbox = ({
  readOnly,
  value,
  updateState,
  pathToState,
  title,
  key,
  dataTestId
}: ICheckBoxProps) => {
  return (
    <Container flexDirection="row" key={key}>
      <FormControlLabel
        disabled={readOnly}
        control={
          <MaterialSwitch
            checked={value}
            data-cy={generateDataTestId(UIDataTargetTypes.Checkbox, dataTestId)}
            onChange={() => updateState(pathToState, !value)}
          />
        }
        label={title}
      ></FormControlLabel>
    </Container>
  );
};
