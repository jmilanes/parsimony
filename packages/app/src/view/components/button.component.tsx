import React from "react";
import MaterialButton from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { generateMetaTestId } from "../../utils";
import { MetaTestIds, UIMetaTargetTypes } from "@parsimony/types/dist";

export type IButtonProps = {
  key?: string;
  name: string;
  action?: (payload: unknown | undefined) => void;
  hidden?: boolean;
  disabled?: boolean;
  type?: "outlined" | "contained" | "text";
  icon?: React.ReactNode;
  metaTestId: MetaTestIds;
  metaTestQualifier?: string;
};

export const Button = ({
  name,
  action,
  hidden,
  disabled,
  type = "outlined",
  icon,
  metaTestId,
  metaTestQualifier
}: IButtonProps) => {
  if (hidden) return <></>;
  const metaId = `${generateMetaTestId(
    UIMetaTargetTypes.Button,
    metaTestId,
    metaTestQualifier
  )}`;
  if (icon) {
    return (
      <IconButton
        onClick={action}
        edge="end"
        aria-label={name}
        data-test-id={metaId}
      >
        {icon}
      </IconButton>
    );
  }
  return (
    <MaterialButton
      data-test-id={metaId}
      disabled={disabled}
      className={
        type === "contained" ? "parsimony-btn-contained" : "parsimony-btn"
      }
      variant={type}
      onClick={action}
    >
      {name}
    </MaterialButton>
  );
};
