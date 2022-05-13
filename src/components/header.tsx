import { PageHeader } from "antd";
import React from "react";

export type IHeaderSizes = "sm" | "md" | "lg" | "page";
export type IHeaderProps = {
  text: string;
  size: IHeaderSizes;
  action?: () => void;
  hidden?: boolean;
  extra?: any[];
};

const Header = ({ text, action, hidden, size, extra }: IHeaderProps) => {
  if (hidden) return <></>;
  const headers: Record<IHeaderSizes, JSX.Element> = {
    sm: <h5 onClick={action}>{text}</h5>,
    md: <h3 onClick={action}>{text}</h3>,
    lg: <h1 onClick={action}>{text}</h1>,
    page: (
      <PageHeader
        title={text}
        onBack={() => window.history.back()}
        extra={extra}
      />
    )
  };

  return headers[size];
};

export default Header;
