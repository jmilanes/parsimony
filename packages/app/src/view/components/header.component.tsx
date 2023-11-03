import { PageHeader } from "antd";
import React from "react";
import Typography from "@mui/material/Typography";

export type IHeaderSizes = "sm" | "md" | "lg" | "page" | "table";
export type IHeaderProps = {
  text: string;
  size: IHeaderSizes;
  action?: () => void;
  hidden?: boolean;
  marginTop?: number;
  extra?: any[];
};

export const Header = ({
  text,
  action,
  hidden,
  size,
  extra,
  marginTop
}: IHeaderProps) => {
  if (hidden) return <></>;
  const headers: Record<IHeaderSizes, JSX.Element> = {
    table: (
      <div className="table-header-container">
        <Typography variant="h5" onClick={action} style={{ marginTop }}>
          {text}
        </Typography>
      </div>
    ),
    sm: (
      <Typography variant="subtitle1" onClick={action} style={{ marginTop }}>
        {text}
      </Typography>
    ),
    md: (
      <Typography variant="h5" onClick={action} style={{ marginTop }}>
        {text}
      </Typography>
    ),
    lg: (
      <Typography variant="h3" onClick={action} style={{ marginTop }}>
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
