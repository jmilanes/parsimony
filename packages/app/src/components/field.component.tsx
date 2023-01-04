import React from "react";

import { Container, Header } from "../components";
import { MetaTestIds, Maybe, UIMetaTargetTypes } from "@parsimony/types";
import TextField from "@mui/material/TextField";
import { generateMetaTestId } from "../utils";

export type IFieldProps = {
  key?: string;
  readOnly?: boolean;
  value?: Maybe<string>;
  pathToState?: string;
  placeHolderText: string;
  //TODO: This should prob be better
  updateState: (path: string, value: string) => void;
  metaTestId: MetaTestIds;
};

export const Field = ({
  readOnly,
  value,
  updateState,
  pathToState,
  placeHolderText,
  key,
  metaTestId
}: IFieldProps) => {
  return readOnly ? (
    <Container flexDirection="row" key={key}>
      <Header text={`${placeHolderText}:`} size="sm" />
      <p>{value}</p>
    </Container>
  ) : (
    <Container flexDirection="column" key={key} margin={10}>
      <TextField
        data-cy={generateMetaTestId(UIMetaTargetTypes.Field, metaTestId)}
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
