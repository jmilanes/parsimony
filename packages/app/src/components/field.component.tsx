import React from "react";

import { Container, Header } from "../components";
import { Maybe } from "@parsimony/types";
import TextField from "@mui/material/TextField";

export type IFieldProps = {
  key?: string;
  readOnly?: boolean;
  value?: Maybe<string>;
  pathToState: string;
  placeHolderText: string;
  updateState: (path: string, value: string) => void;
};

export const Field = ({
  readOnly,
  value,
  updateState,
  pathToState,
  placeHolderText,
  key
}: IFieldProps) => {
  return readOnly ? (
    <Container flexDirection="row" key={key}>
      <Header text={`${placeHolderText}:`} size="sm" />
      <p>{value}</p>
    </Container>
  ) : (
    <Container flexDirection="column" key={key} margin={10}>
      <TextField
        size="small"
        key={key}
        label={placeHolderText}
        placeholder={placeHolderText}
        value={value || ""}
        onChange={(e) => updateState(pathToState, e.currentTarget.value)}
      ></TextField>
    </Container>
  );
};
