import React from "react";
import { Container } from "./index";
import { formatFormHeader } from "../../utils";
import { Maybe } from "@parsimony/types/dist";

export type IReadOnlyProps = {
  title?: string;
  value?: Maybe<string | number> | string;
  metaTestId: string;
};

export const ReadOnly = ({ title, value, metaTestId }: IReadOnlyProps) => {
  return (
    <Container flexDirection="row" margin={1}>
      <p>{formatFormHeader(title || "")}</p>
      <p data-test-id={`${metaTestId}-read-only`}>{value || ""}</p>
    </Container>
  );
};
