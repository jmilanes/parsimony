import React, { useMemo } from "react";

import {
  Collection,
  Domains,
  Program,
  ProgramsPageMetaTestIds
} from "@parsimony/types";

import { IColumns, ITableAction, Table } from "../../components";

import { Container } from "typedi";
import { navigateToRoute } from "../../utils";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { createBulkOrderSelectable } from "../bulkPrograms/helpers";

export type ICollectionTableProps = React.PropsWithChildren<{
  collections: Collection[];
}>;

export const CollectionTable = ({ collections }: ICollectionTableProps) => {
  const API = Container.get(UIApi);
  const navigate = navigateToRoute();

  const columns: IColumns[] = [
    { key: "title", dataIndex: "title", title: "title" }
  ];
  const actions: ITableAction[] = [
    {
      name: "Open",
      method: (collection: Collection) => navigate(`/books/${collection.id}`)
    },
    {
      name: "Delete",
      method: async (collection: Required<Collection>) => {
        await API.makeRequest({
          domain: Domains.Collection,
          requestType: "delete",
          //TODO Better Types on this
          payload: { id: collection.id }
        });
      }
    }
  ];

  const bulkOrder = API.getAppState("bulkPrograms");
  const { onChange, selected } = useMemo(() => {
    return createBulkOrderSelectable<Collection>(
      "parentCollectionId",
      "collectionIds"
    );
  }, []);

  console.log(bulkOrder);
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
