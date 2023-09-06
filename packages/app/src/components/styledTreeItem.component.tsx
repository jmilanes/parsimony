import * as React from "react";

import Box from "@mui/material/Box";
import TreeItem, { TreeItemProps } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import { SvgIconProps } from "@mui/material/SvgIcon";
import CloseIcon from "@mui/icons-material/Close";

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  bgColorForDarkMode?: string;
  color?: string;
  colorForDarkMode?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
  onClose?: () => void;
  onClick?: () => void;
};

export const StyledTreeItem = (props: StyledTreeItemProps) => {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    colorForDarkMode,
    bgColorForDarkMode,
    onClose,
    onClick,
    ...other
  } = props;

  return (
    <TreeItem
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 0.5,
            pr: 0
          }}
        >
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
            onClick={onClick}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
          {onClose && (
            <Box
              component={CloseIcon}
              onClick={onClose}
              color="inherit"
              sx={{ mr: 1 }}
            />
          )}
        </Box>
      }
      {...other}
    />
  );
};
