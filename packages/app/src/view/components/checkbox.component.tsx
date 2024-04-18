import React from "react";
import { Container } from "./index";
import MaterialSwitch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import { CONTAINER_INPUT_MARGIN } from "../../constants";

export type ICheckBoxProps = {
  key?: string;
  readOnly?: boolean;
  value: boolean;
  title: string;
  onChange: (value: boolean) => void;
  metaTestId: string;
};

export const Checkbox = ({
  readOnly,
  value,
  onChange,
  title,
  key,
  metaTestId
}: ICheckBoxProps) => {
  return (
    <Container flexDirection="row" key={key} margin={CONTAINER_INPUT_MARGIN}>
      <FormControlLabel
        disabled={readOnly}
        control={
          <MaterialSwitch
            checked={value}
            data-testid={metaTestId}
            onChange={() => onChange(!value)}
          />
        }
        label={title}
      ></FormControlLabel>
    </Container>
  );
};
