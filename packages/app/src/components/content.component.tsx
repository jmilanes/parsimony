import React from "react";
import "./styles.css";
import MAterialContainer from "@mui/material/Container";

export type IContentProps = {
  hidden?: boolean;
  children: any;
};

export const Content = ({ children, hidden }: IContentProps) => {
  if (hidden) return <></>;
  return (
    <MAterialContainer className="site-layout-background">
      {children}
    </MAterialContainer>
  );
};
