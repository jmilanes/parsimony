import { Input } from "antd";
import React from "react";

import { Container, Header } from "../components";
import { Maybe } from "@parsimony/types";

export type IFieldProps = {
  key?: string;
  readOnly?: boolean;
  value?: Maybe<string>;
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
    <Container flexDirection="row" key={key}>
      <Header text={`${placeHolderText}:`} size="sm" />
      <p>{value}</p>
    </Container>
  ) : (
    <Container flexDirection="column" key={key}>
      <Header text={`${placeHolderText}:`} size="sm" />
      <Input
        key={key}
        placeholder={placeHolderText}
        value={value || ""}
        onChange={(e) => updateState(pathToState, e.currentTarget.value)}
      ></Input>
    </Container>
  );
};

export default Field;
