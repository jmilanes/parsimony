import React from "react";
import { Button as AntDButton } from "antd";

export type IButtonProps = {
  key?: string;
  name: string;
  action: (payload: unknown | undefined) => void;
  hidden?: boolean;
  type?: "primary";
};

const Button = ({ name, action, hidden, type }: IButtonProps) => {
  if (hidden) return <></>;
  return (
    <AntDButton type={type} onClick={action}>
      {name}
    </AntDButton>
  );
};

export default Button;
