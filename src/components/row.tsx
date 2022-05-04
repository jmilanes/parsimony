import React, { PropsWithChildren } from "react";
import "./styles.css";
import { Row as AntRow, RowProps } from "antd";

export type IRowProps = PropsWithChildren<
  {
    hidden?: boolean;
  } & RowProps
>;

const Row = ({ children, hidden, ...rowProps }: IRowProps) => {
  if (hidden) return <></>;
  return <AntRow {...rowProps}>{children}</AntRow>;
};

export default Row;
