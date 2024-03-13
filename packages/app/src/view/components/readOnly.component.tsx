import React from "react";
import { Container } from "./index";
import { formatFormHeader } from "../../utils";

export type IReadOnlyProps = {
  title?: string;
  value?: string | number;
  metaTestId: string;
};

export const ReadOnly = ({ title, value, metaTestId }: IReadOnlyProps) => {
  return (
    <Container flexDirection="row" margin={1}>
      <p>{formatFormHeader(title || "")}</p>
      <p data-testid={`${metaTestId}-read-only`}>{value || ""}</p>
    </Container>
  );
};
