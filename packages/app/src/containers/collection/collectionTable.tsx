import React from "react";

import { ProgramsPageMetaTestIds, Domains, Collection } from "@parsimony/types";

import { IColumns, ITableAction, Table } from "../../components";

import { Container } from "typedi";
import { navigateToRoute } from "../../utils";
import UIApi from "../../domains/uiApi/uiApi.Service";

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

  return (
    <Table<Collection>
      data={collections}
      columns={columns}
      actions={actions}
      name="Programs"
      metaTestId={ProgramsPageMetaTestIds.table}
    />
  );
};
