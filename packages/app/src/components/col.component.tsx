import React, { PropsWithChildren } from "react";
import "./styles.css";
import { Col as AntCol, ColProps } from "antd";

export type IColPros = PropsWithChildren<
  {
    hidden?: boolean;
  } & ColProps
>;

export const Col = ({ children, hidden, ...colProps }: IColPros) => {
  if (hidden) return <></>;
  return <AntCol {...colProps}>{children}</AntCol>;
};
