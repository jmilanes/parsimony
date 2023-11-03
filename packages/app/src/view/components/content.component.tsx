import React from "react";
import "./styles.css";
import MaterialContainer from "@mui/material/Container";

export type IContentProps = {
  hidden?: boolean;
  children: any;
};

export const Content = ({ children, hidden }: IContentProps) => {
  if (hidden) return <></>;
  return (
    <MaterialContainer className="site-layout-background">
      {children}
    </MaterialContainer>
  );
};
