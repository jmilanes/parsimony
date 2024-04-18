import React from "react";
import MaterialButton from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

export type IButtonProps = {
  key?: string;
  name: string;
  onClick?: (payload: unknown | undefined) => void;
  hidden?: boolean;
  disabled?: boolean;
  type?: "outlined" | "contained" | "text";
  icon?: React.ReactNode;
  metaTestId: string;
};

export const Button = ({
  name,
  onClick,
  hidden,
  disabled,
  type = "outlined",
  icon,
  metaTestId
}: IButtonProps) => {
  if (hidden) return <></>;

  if (icon) {
    return (
      <IconButton
        onClick={onClick}
        edge="end"
        aria-label={name}
        data-testid={metaTestId}
      >
        {icon}
      </IconButton>
    );
  }
  return (
    <MaterialButton
      data-testid={metaTestId}
      disabled={disabled}
      className={
        type === "contained" ? "parsimony-btn-contained" : "parsimony-btn"
      }
      variant={type}
      onClick={onClick}
    >
      {name}
    </MaterialButton>
  );
};
