import React from "react";

import { Container, ReadOnly } from "./index";
import { MetaTestIds, Maybe, UIMetaTargetTypes } from "@parsimony/types";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { generateMetaTestId } from "../../utils";
import { CONTAINER_INPUT_MARGIN } from "../../constants";

export type IFieldProps = Omit<TextFieldProps, "onChange"> & {
  key?: string;
  readOnly?: boolean;
  value?: Maybe<string>;
  placeHolderText: string;
  onChange: (value: string) => void;
  metaTestId: MetaTestIds;
  metaTestQualifier?: string;
};

export const Field = ({
  readOnly,
  value,
  onChange,
  placeHolderText,
  key,
  metaTestId,
  metaTestQualifier,
  ...rest
}: IFieldProps) => {
  const metaId = generateMetaTestId(
    UIMetaTargetTypes.Field,
    metaTestId,
    metaTestQualifier
  );
  return readOnly ? (
    <ReadOnly metaTestId={metaId} value={value} title={placeHolderText} />
  ) : (
    <Container flexDirection="column" key={key} margin={CONTAINER_INPUT_MARGIN}>
      <TextField
        data-test-id={metaId}
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
