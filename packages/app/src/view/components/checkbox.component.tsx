import React from "react";
import { Container, Header } from "./index";
import MaterialSwitch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { generateMetaTestId } from "../../utils";
import { MetaTestIds, UIMetaTargetTypes } from "@parsimony/types";
import { CONTAINER_INPUT_MARGIN } from "../../constants";

export type ICheckBoxProps = {
  key?: string;
  readOnly?: boolean;
  value: boolean;
  title: string;
  onChange: (value: boolean) => void;
  metaTestId: MetaTestIds;
  metaTestQualifier?: string;
};

export const Checkbox = ({
  readOnly,
  value,
  onChange,
  title,
  key,
  metaTestId,
  metaTestQualifier
}: ICheckBoxProps) => {
  return (
    <Container flexDirection="row" key={key} margin={CONTAINER_INPUT_MARGIN}>
      <FormControlLabel
        disabled={readOnly}
        control={
          <MaterialSwitch
            checked={value}
            data-test-id={generateMetaTestId(
              UIMetaTargetTypes.Checkbox,
              metaTestId,
              metaTestQualifier
            )}
            onChange={() => onChange(!value)}
          />
        }
        label={title}
      ></FormControlLabel>
    </Container>
  );
};
