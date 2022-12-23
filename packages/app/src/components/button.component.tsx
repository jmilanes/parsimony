import React from "react";
import MaterialButton from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { generateDataTestId } from "../utils";
import { UIDataTargetTypes } from "@parsimony/types/src";

export type IButtonProps = {
  key?: string;
  name: string;
  action?: (payload: unknown | undefined) => void;
  hidden?: boolean;
  disabled?: boolean;
  type?: "outlined" | "contained" | "text";
  icon?: React.ReactNode;
  dataTestId?: string;
};

export const Button = ({
  name,
  action,
  hidden,
  disabled,
  type = "outlined",
  icon,
  dataTestId
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
      data-cy={generateDataTestId(UIDataTargetTypes.Button, dataTestId || "")}
      disabled={disabled}
      className="parsimony-btn"
      variant={type}
      onClick={action}
    >
      {name}
    </MaterialButton>
  );
};
