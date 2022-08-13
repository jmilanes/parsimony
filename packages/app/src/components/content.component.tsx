import React from "react";
import "./styles.css";
import { Layout } from "antd";

const { Content: AntContent } = Layout;

export type IContentProps = {
  hidden?: boolean;
  children: any;
};

const Content = ({ children, hidden }: IContentProps) => {
  if (hidden) return <></>;
  return (
    <AntContent
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280
      }}
    >
      {children}
    </AntContent>
  );
};

export default Content;
