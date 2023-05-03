import React from "react";

import { ProgramsPageMetaTestIds, Domains, Collection } from "@parsimony/types";

import { IColumns, ITableAction, Table } from "../../components";

import { Container } from "typedi";
import { CommandService } from "../../domains/commands/command.service";
import { navigateToRoute } from "../../utils";

export type ICollectionTableProps = React.PropsWithChildren<{
  collections: Collection[];
}>;

export const CollectionTable = ({ collections }: ICollectionTableProps) => {
  const CS = Container.get(CommandService);
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
      method: (collection: Required<Collection>) => {
        CS.api.makeRequest({
          domain: Domains.Collection,
          requestType: "delete",
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
