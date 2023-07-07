import React from "react";
import { Collection } from "@parsimony/types";
import { TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { AsyncTreeItem } from "./asyncTreeItem.component";

export type TreeActions = {
  onClose?: (id: string, isProgram?: boolean) => void;
  onClick?: (id: string, isProgram?: boolean) => void;
};

type TreeProps = {
  collections: Collection[];
  actions?: TreeActions;
};
export const Tree = ({ collections, actions = {} }: TreeProps) => {
  return (
    <TreeView
      aria-label="Program Tree"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {collections.map((collection) => (
        <AsyncTreeItem
          key={`tree-item-${collection.id}`}
          collectionId={collection.id}
          actions={actions}
        />
      ))}
    </TreeView>
  );
};
