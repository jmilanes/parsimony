import React from "react";

export type IHeaderSizes = "sm" | "md" | "lg";
export type IHeaderProps = {
  text: string;
  size: IHeaderSizes;
  action?: () => void;
  hidden?: boolean;
};

const Header = ({ text, action, hidden, size }: IHeaderProps) => {
  if (hidden) <></>;
  const headers: Record<IHeaderSizes, JSX.Element> = {
    sm: <h5 onClick={action}>{text}</h5>,
    md: <h3 onClick={action}>{text}</h3>,
    lg: <h2 onClick={action}>{text}</h2>
  };

  return headers[size];
};

export default Header;
