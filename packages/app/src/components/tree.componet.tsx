import React from "react";

import { Container } from "typedi";
import UIApi from "../domains/uiApi/uiApi.Service";
import { useAsync } from "react-use";
import { DATA_HANDLERS } from "../domains/orchestration/orchestrationHandlers/handlers.typemap";
import { Collection, Domains } from "@parsimony/types";
import { TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Collections from "@mui/icons-material/Collections";
import DescriptionIcon from "@mui/icons-material/Description";
import { StyledTreeItem } from "./styledTreeItem.component";

// TODO: Make this better and add exclusion.
//  Also need better way to know when I need to fetch now we are going to be fetching more frequently
const AsyncTreeItem = ({ collectionId }: { collectionId: string }) => {
  const API = Container.get(UIApi);

  const { loading } = useAsync(async () => {
    await API.setUpDataFor(DATA_HANDLERS.COLLECTION_PAGE, { collectionId });
  }, []);

  if (loading) return null;

  const collections = API.getItemsFromStore(Domains.Collection).filter((c) => {
    return (
      c.id !== collectionId &&
      c.parentCollectionId === collectionId &&
      !API.actions.bulkPrograms.isIdIncludedInBulkProgramProperty(
        c.id,
        "excludedIds"
      )
    );
  });

  const programs = API.getItemsFromStore(Domains.Program).filter((program) => {
    return (
      program.collectionId === collectionId &&
      !API.actions.bulkPrograms.isIdIncludedInBulkProgramProperty(
        program.id,
        "excludedIds"
      )
    );
  });

  const collection = API.getItem(Domains.Collection, collectionId);

  const removeSelection = (id: string, program: boolean = false) => {
    API.actions.bulkPrograms.addIdToBulkProgramProperty(id, "excludedIds");
    API.actions.bulkPrograms.removeIdFromBulkProgramProperty(
      id,
      program ? "programIds" : "collectionIds"
    );
  };

  return (
    <StyledTreeItem
      nodeId={`tree-item-${collectionId}`}
      labelText={collection.title || ""}
      labelIcon={Collections}
      onClose={() => removeSelection(collectionId)}
    >
      {collections.map((collection) => (
        <AsyncTreeItem collectionId={collection.id} />
      ))}
      {programs.map((program) => (
        <StyledTreeItem
          id={program.id || ""}
          nodeId={`tree-item-program-${program.id}`}
          labelText={program.title || ""}
          labelIcon={DescriptionIcon}
          onClose={() => removeSelection(program.id)}
        />
      ))}
    </StyledTreeItem>
  );
};

export const Tree = ({ collections }: { collections: Collection[] }) => {
  const API = Container.get(UIApi);

  const filteredCollections = collections.filter(
    (collection) =>
      !API.actions.bulkPrograms.isIdIncludedInBulkProgramProperty(
        collection.id,
        "excludedIds"
      )
  );

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      multiSelect
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
    >
      {filteredCollections.map((collection) => (
        <AsyncTreeItem
          key={`tree-item-${collection.id}`}
          collectionId={collection.id}
        />
      ))}
    </TreeView>
  );
};
