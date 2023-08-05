import React from "react";

import { Container } from "typedi";
import UIApi from "../domains/uiApi/uiApi.Service";
import { useAsync } from "react-use";
import { DATA_HANDLERS } from "../domains/orchestration/orchestrationHandlers/handlers.typemap";
import { Domains } from "@parsimony/types";
import { StyledTreeItem } from "./styledTreeItem.component";
import Collections from "@mui/icons-material/Collections";
import DescriptionIcon from "@mui/icons-material/Description";
import { TreeActions } from "./tree.componet";

type AsyncTreeItemProps = { collectionId: string; actions: TreeActions };

const handleAction =
  <K extends keyof TreeActions>(action: K, actions: TreeActions) =>
  (id: string, isProgram: boolean = false) => {
    const method = actions[action];
    return method ? () => method && method(id, isProgram) : undefined;
  };

export const AsyncTreeItem = ({
  collectionId,
  actions
}: AsyncTreeItemProps) => {
  const API = Container.get(UIApi);

  const { loading } = useAsync(async () => {
    await API.system.setUpDataFor(DATA_HANDLERS.COLLECTION_PAGE, {
      collectionId
    });
  }, []);

  if (loading) return null;

  const collections = API.system
    .getItemsFromStore(Domains.Collection)
    .filter((c) => {
      return (
        c.id !== collectionId &&
        c.parentCollectionId === collectionId &&
        !API.actions.bulkPrograms.isIdIncludedInBulkProgramProperty(
          c.id,
          "excludedIds"
        )
      );
    });

  const programs = API.system
    .getItemsFromStore(Domains.Program)
    .filter((program) => {
      return (
        program.collectionId === collectionId &&
        !API.actions.bulkPrograms.isIdIncludedInBulkProgramProperty(
          program.id,
          "excludedIds"
        )
      );
    });

  const collection = API.system.getItem(Domains.Collection, collectionId);

  const onClose = handleAction("onClose", actions);
  const onClick = handleAction("onClick", actions);

  return (
    <StyledTreeItem
      nodeId={`tree-item-${collectionId}`}
      key={`tree-styled-item-${collectionId}`}
      labelText={collection.title || ""}
      labelIcon={Collections}
      onClose={onClose(collectionId)}
      onClick={onClick(collectionId)}
    >
      {collections.map((collection) => (
        <AsyncTreeItem
          key={`tree-item-${collection.id}`}
          collectionId={collection.id}
          actions={actions}
        />
      ))}

      {programs.map((program) => {
        return (
          <StyledTreeItem
            key={`tree-styled-item-${program.id}`}
            id={program.id || ""}
            nodeId={`tree-item-program-${program.id}`}
            labelText={program.title || ""}
            labelIcon={DescriptionIcon}
            onClose={onClose(program.id, true)}
            onClick={onClick(program.id, true)}
          />
        );
      })}
    </StyledTreeItem>
  );
};
