import React, { PropsWithChildren } from "react";
import { compileStyles } from "../../utils";
import "./styles.css";

export type IFlexDirection =
  | "row"
  | "row-reverse"
  | "column"
  | "columns-reverse";
export type IContainerProps = PropsWithChildren<{
  hidden?: boolean;
  flexDirection?: IFlexDirection;
  containerKey?: string;
  margin?: number;
}>;

export const Container = ({
  children,
  hidden,
  flexDirection,
  margin
}: IContainerProps) => {
  const containerStyles = compileStyles({
    container: true,
    hidden: !!hidden,
    row: flexDirection === "row",
    column: flexDirection === "column" || !flexDirection,
    rowReversed: flexDirection === "row-reverse",
    columnReversed: flexDirection === "columns-reverse"
  });
  return (
    <div style={{ margin }} className={containerStyles}>
      {children}
    </div>
  );
};
