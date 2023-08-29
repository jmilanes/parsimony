import React, { useMemo } from "react";

import {
  Collection,
  Domains,
  Program,
  ProgramsPageMetaTestIds
} from "@parsimony/types";

import { IColumns, ISelectable, ITableAction, Table } from "../../components";

import { Container } from "typedi";
import { navigateToRoute } from "../../utils";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { createBulkOrderSelectable } from "../bulkPrograms/helpers";

export type ICollectionTableProps = React.PropsWithChildren<{
  collections: Collection[];
  actions: ITableAction[];
}>;

export const CollectionTable = ({
  collections,
  actions
}: ICollectionTableProps) => {
  const API = Container.get(UIApi);

  const columns: IColumns[] = [{ key: "title", title: "title" }];

  const bulkOrder = API.system.getAppState("bulkPrograms");
  const { onChange, selected } = useMemo(() => {
    return createBulkOrderSelectable<Collection>(
      "parentCollectionId",
      "collectionIds"
    );
  }, []);

  return (
    <Table<Collection>
      data={collections}
      columns={columns}
      actions={actions}
      name="Programs"
      metaTestId={ProgramsPageMetaTestIds.table}
      selectable={{ visible: bulkOrder.active, selected, onChange }}
    />
  );
};
