import React from "react";
import MaterialButton from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

export type IButtonProps = {
  key?: string;
  name: string;
  action?: (payload: unknown | undefined) => void;
  hidden?: boolean;
  disabled?: boolean;
  type?: "outlined" | "contained" | "text";
  icon?: React.ReactNode;
};

export const Button = ({
  name,
  action,
  hidden,
  disabled,
  type = "outlined",
  icon
}: IButtonProps) => {
  if (hidden) return <></>;
  if (icon) {
    return (
      <IconButton onClick={action} edge="end" aria-label={name}>
        {icon}
      </IconButton>
    );
  }
  return (
    <MaterialButton
      disabled={disabled}
      className="parsimony-btn"
      variant={type}
      onClick={action}
    >
      {name}
    </MaterialButton>
  );
};
