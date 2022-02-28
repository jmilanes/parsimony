import React from "react";

import { Container, Header } from "../components";

export type IFieldProps = {
  key?: string;
  readOnly?: boolean;
  value?: string;
  pathToState: string;
  placeHolderText: string;
  updateState: (path: string, value: string) => void;
};

const Field = ({
  readOnly,
  value,
  updateState,
  pathToState,
  placeHolderText,
  key
}: IFieldProps) => {
  return readOnly ? (
    <Container flexDirection="column" key={key}>
      <Header text={placeHolderText} size="sm" />
      <p>{value}</p>
    </Container>
  ) : (
    <input
      key={key}
      placeholder={placeHolderText}
      value={value}
      onChange={(e) => updateState(pathToState, e.currentTarget.value)}
    ></input>
  );
};

export default Field;
