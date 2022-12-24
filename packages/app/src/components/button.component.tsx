import React from "react";
import MaterialButton from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { generateDataTestId } from "../utils";
import { DataTestIds, UIDataTargetTypes } from "@parsimony/types/src";

export type IButtonProps = {
  key?: string;
  name: string;
  action?: (payload: unknown | undefined) => void;
  hidden?: boolean;
  disabled?: boolean;
  type?: "outlined" | "contained" | "text";
  icon?: React.ReactNode;
  dataTestId: DataTestIds;
  dataTestQualifier?: string;
};

export const Button = ({
  name,
  action,
  hidden,
  disabled,
  type = "outlined",
  icon,
  dataTestId,
  dataTestQualifier
}: IButtonProps) => {
  if (hidden) return <></>;
  const dataId = `${generateDataTestId(UIDataTargetTypes.Button, dataTestId)}${
    dataTestQualifier ? `-${dataTestQualifier}` : ""
  }`;
  if (icon) {
    return (
      <IconButton
        onClick={action}
        edge="end"
        aria-label={name}
        data-cy={dataId}
      >
        {icon}
      </IconButton>
    );
  }
  return (
    <MaterialButton
      data-cy={dataId}
      disabled={disabled}
      className="parsimony-btn"
      variant={type}
      onClick={action}
    >
      {name}
    </MaterialButton>
  );
};
