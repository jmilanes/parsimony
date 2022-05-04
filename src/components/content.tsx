import React, { PropsWithChildren } from "react";
import "./styles.css";
import { Layout } from "antd";

const { Content } = Layout;

export type IContentProps = PropsWithChildren<{
  hidden?: boolean;
}>;

const Container = ({ children, hidden }: IContentProps) => {
  if (hidden) return <></>;
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280
      }}
    >
      {children}
    </Content>
  );
};

export default Content;
