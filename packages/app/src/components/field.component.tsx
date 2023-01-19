import React from "react";

import { Container, ReadOnly } from "../components";
import { MetaTestIds, Maybe, UIMetaTargetTypes } from "@parsimony/types";
import TextField from "@mui/material/TextField";
import { generateMetaTestId } from "../utils";
import { CONTAINER_INPUT_MARGIN } from "../constants";

export type IFieldProps = {
  key?: string;
  readOnly?: boolean;
  value?: Maybe<string>;
  pathToState?: string;
  placeHolderText: string;
  //TODO: This should prob be better
  updateState: (path: string, value: string) => void;
  metaTestId: MetaTestIds;
  metaTestQualifier?: string;
};

export const Field = ({
  readOnly,
  value,
  updateState,
  pathToState,
  placeHolderText,
  key,
  metaTestId,
  metaTestQualifier
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
        onChange={(e) => updateState(pathToState || "", e.currentTarget.value)}
      ></TextField>
    </Container>
  );
};
