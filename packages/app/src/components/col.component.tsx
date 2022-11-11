import React, { PropsWithChildren } from "react";
import "./styles.css";
import Grid from "@mui/material/Grid";

export type IColPros = PropsWithChildren<{
  hidden?: boolean;
  xs: number;
}>;

export const Col = ({ children, hidden, xs }: IColPros) => {
  if (hidden) return <></>;
  return (
    <Grid item xs={xs}>
      {children}
    </Grid>
  );
};
