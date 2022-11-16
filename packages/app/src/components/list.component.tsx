import React from "react";

import MaterialList from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import Avatar from "@mui/material/Avatar";

export type IListItem = {
  value: string;
  action: () => void;
  avatarSrc?: string;
  secondaryAction?: React.ReactNode;
};

export type IListProps = {
  listItems: IListItem[];
};

export function List({ listItems }: IListProps) {
  return (
    <MaterialList component="nav" dense>
      {listItems.map((item) => {
        return (
          <ListItem
            key={item.value}
            secondaryAction={item.secondaryAction}
            onClick={item.action}
          >
            <ListItemButton>
              {item.avatarSrc && (
                <ListItemAvatar>
                  <Avatar>
                    <img src="avatarSrc" alt="avatar" />
                  </Avatar>
                </ListItemAvatar>
              )}
              <ListItemText primary={item.value} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </MaterialList>
  );
}
