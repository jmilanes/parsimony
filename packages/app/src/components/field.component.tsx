import React from "react";

import { Container, Header } from "../components";
import { DataTestIds, Maybe, UIDataTargetTypes } from "@parsimony/types";
import TextField from "@mui/material/TextField";
import { generateDataTestId } from "../utils";

export type IFieldProps = {
  key?: string;
  readOnly?: boolean;
  value?: Maybe<string>;
  pathToState?: string;
  placeHolderText: string;
  //TODO: This should prob be better
  updateState: (path: string, value: string) => void;
  dataTestId: DataTestIds;
};

export const Field = ({
  readOnly,
  value,
  updateState,
  pathToState,
  placeHolderText,
  key,
  dataTestId
}: IFieldProps) => {
  return readOnly ? (
    <Container flexDirection="row" key={key}>
      <Header text={`${placeHolderText}:`} size="sm" />
      <p>{value}</p>
    </Container>
  ) : (
    <Container flexDirection="column" key={key} margin={10}>
      <TextField
        data-cy={generateDataTestId(UIDataTargetTypes.Field, dataTestId)}
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
