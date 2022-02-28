import React from "react";
import { Container, Header } from "../components";

export type ICheckBoxProps = {
  key?: string;
  readOnly?: boolean;
  value: boolean;
  pathToState: string;
  title: string;
  updateState: (path: string, value: boolean) => void;
};

const Checkbox = ({
  readOnly,
  value,
  updateState,
  pathToState,
  title,
  key
}: ICheckBoxProps) => {
  return (
    <Container flexDirection="row" key={key}>
      <Header text={`${title}: `} size="sm" />
      <input
        type="checkbox"
        disabled={readOnly}
        checked={value}
        onChange={() => updateState(pathToState, !value)}
      />
    </Container>
  );
};

export default Checkbox;
