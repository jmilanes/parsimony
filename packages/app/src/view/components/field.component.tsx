import React from "react";

import { Container, ReadOnly } from "./index";
import { Maybe } from "@parsimony/types";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { CONTAINER_INPUT_MARGIN } from "../../constants";

export type IFieldProps = Omit<TextFieldProps, "onChange"> & {
  key?: string;
  readOnly?: boolean;
  value?: Maybe<string>;
  placeHolderText: string;
  onChange: (value: string) => void;
  metaTestId: string;
};

export const Field = ({
  readOnly,
  value,
  onChange,
  placeHolderText,
  key,
  metaTestId,
  ...rest
}: IFieldProps) => {
  return readOnly ? (
    <ReadOnly metaTestId={metaTestId} value={value} title={placeHolderText} />
  ) : (
    <Container flexDirection="column" key={key} margin={CONTAINER_INPUT_MARGIN}>
      <TextField
        inputProps={{ "data-testid": metaTestId }}
        size="small"
        key={key}
        label={placeHolderText}
        placeholder={placeHolderText}
        value={value || ""}
        onChange={(e) => onChange(e.currentTarget.value)}
        {...rest}
      />
    </Container>
  );
};
