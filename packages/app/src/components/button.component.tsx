import React from "react";
import MaterialButton from "@mui/material/Button";

export type IButtonProps = {
  key?: string;
  name: string;
  action?: (payload: unknown | undefined) => void;
  hidden?: boolean;
  type?: "outlined" | "contained" | "text";
};

export const Button = ({
  name,
  action,
  hidden,
  type = "outlined"
}: IButtonProps) => {
  if (hidden) return <></>;
  return (
    <MaterialButton variant={type} onClick={action}>
      {name}
    </MaterialButton>
  );
};
