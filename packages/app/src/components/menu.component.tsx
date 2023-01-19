import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MaterialMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  ChatMetaTestIds,
  MetaTestIds,
  UIMetaTargetTypes
} from "@parsimony/types/src";
import { generateMetaTestId } from "../utils";

const ITEM_HEIGHT = 48;

export type IMenuOption = {
  label: string;
  icon?: React.ReactNode;
  action: () => void;
  metaTestId: MetaTestIds;
};

export type IMenuProps = {
  options: IMenuOption[];
  metaTestId: MetaTestIds;
};

export const Menu = ({ options, metaTestId }: IMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        data-test-id={generateMetaTestId(UIMetaTargetTypes.Button, metaTestId)}
      >
        <MoreVertIcon />
      </IconButton>
      <MaterialMenu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch"
          }
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => {
              option.action();
              handleClose();
            }}
            data-test-id={generateMetaTestId(
              UIMetaTargetTypes.Button,
              option.metaTestId
            )}
          >
            {option.icon}
            {option.label}
          </MenuItem>
        ))}
      </MaterialMenu>
    </div>
  );
};
