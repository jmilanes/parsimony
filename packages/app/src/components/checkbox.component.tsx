import React from "react";
import { Container, Header } from "../components";
import MaterialSwitch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { generateMetaTestId } from "../utils";
import { MetaTestIds, UIMetaTargetTypes } from "@parsimony/types/src";

export type ICheckBoxProps = {
  key?: string;
  readOnly?: boolean;
  value: boolean;
  pathToState: string;
  title: string;
  updateState: (path: string, value: boolean) => void;
  metaTestId: MetaTestIds;
};

export const Checkbox = ({
  readOnly,
  value,
  updateState,
  pathToState,
  title,
  key,
  metaTestId
}: ICheckBoxProps) => {
  return (
    <Container flexDirection="row" key={key}>
      <FormControlLabel
        disabled={readOnly}
        control={
          <MaterialSwitch
            checked={value}
            data-cy={generateMetaTestId(UIMetaTargetTypes.Checkbox, metaTestId)}
            onChange={() => updateState(pathToState, !value)}
          />
        }
        label={title}
      ></FormControlLabel>
    </Container>
  );
};
