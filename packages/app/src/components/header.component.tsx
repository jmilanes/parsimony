import { PageHeader } from "antd";
import React from "react";
import Typography from "@mui/material/Typography";

export type IHeaderSizes = "sm" | "md" | "lg" | "page";
export type IHeaderProps = {
  text: string;
  size: IHeaderSizes;
  action?: () => void;
  hidden?: boolean;
  extra?: any[];
};

export const Header = ({ text, action, hidden, size, extra }: IHeaderProps) => {
  if (hidden) return <></>;
  const headers: Record<IHeaderSizes, JSX.Element> = {
    sm: (
      <Typography variant="h6" onClick={action}>
        {text}
      </Typography>
    ),
    md: (
      <Typography variant="h5" onClick={action}>
        {text}
      </Typography>
    ),
    lg: (
      <Typography variant="h3" onClick={action}>
        {text}
      </Typography>
    ),
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
