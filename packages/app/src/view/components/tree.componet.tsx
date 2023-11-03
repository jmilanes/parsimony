import React from "react";
import { Collection, Program } from "@parsimony/types/dist";
import { TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { AsyncTreeItem } from "./asyncTreeItem.component";
import { StyledTreeItem } from "./styledTreeItem.component";
import DescriptionIcon from "@mui/icons-material/Description";
import Collections from "@mui/icons-material/Collections";
import { Container } from "typedi";
import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";

export type TreeActions = {
  onClose?: (id: string, isProgram?: boolean) => void;
  onClick?: (id: string, isProgram?: boolean) => void;
};

type TreeProps = {
  collections: Collection[];
  orphanPrograms?: Program[];
  clientName: string;
  actions?: TreeActions;
};
export const CollectionTree = ({
  collections,
  actions = {},
  clientName,
  orphanPrograms = []
}: TreeProps) => {
  const API = Container.get(UIApi);
  const orphanProgramItems = orphanPrograms.map((program) => {
    return (
      <StyledTreeItem
        key={`tree-styled-item-${program.id}`}
        id={program.id || ""}
        nodeId={`tree-item-program-${program.id}`}
        labelText={program.title || ""}
        labelIcon={DescriptionIcon}
        onClose={() => actions?.onClose && actions?.onClose(program.id, true)}
        onClick={() => actions?.onClick && actions?.onClick(program.id, true)}
      />
    );
  });

  return (
    <TreeView
      aria-label="Program Tree"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      <StyledTreeItem
        nodeId={`tree-item-root`}
        key={`tree-styled-item-root`}
        labelText={`${clientName} Collections & Programs`}
        labelIcon={Collections}
      >
        {orphanProgramItems}
        {collections.map((collection) => (
          <AsyncTreeItem
            key={`tree-item-${collection.id}`}
            collectionId={collection.id}
            actions={actions}
          />
        ))}
      </StyledTreeItem>
    </TreeView>
  );
};
