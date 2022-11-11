import React, { PropsWithChildren } from "react";
import "./styles.css";
import Grid from "@mui/material/Grid";

export type IRowProps = PropsWithChildren<{
  hidden?: boolean;
  gutter?: number;
  className?: string;
}>;

export const Row = ({ children, hidden, gutter, className }: IRowProps) => {
  if (hidden) return <></>;
  return (
    <Grid className={className} container spacing={gutter}>
      {children}
    </Grid>
  );
};
