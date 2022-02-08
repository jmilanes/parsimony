import React from "react";

export type IButtonProps = {
  name: string;
  action: any;
  hidden?: boolean;
};

const Button = ({ name, action, hidden }: IButtonProps) => {
  if (hidden) return;
  return <button onClick={action}>{name}</button>;
};

export default Button;
