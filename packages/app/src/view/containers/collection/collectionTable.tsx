import React, { useMemo } from "react";

import { Collection, Domains } from "@parsimony/types";

import { IColumns, ITableAction, Table } from "../../components";

import { Container } from "typedi";

import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";
import { createBulkOrderSelectable } from "../program/bulkPrograms/helpers";
import { CollectionSelectorContainer } from "./collectionSelector.container";

export type ICollectionTableProps = React.PropsWithChildren<{
  collections: Collection[];
  actions: ITableAction[];
  metaTestId: string;
}>;

export const CollectionTable = ({
  collections,
  actions,
  metaTestId
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

  const body = (collection: Collection) => {
    return <CollectionSelectorContainer entity={collection} />;
  };

  const openMoveSelectorDialog = (collection: Collection) => {
    API.system.updateAppState("dialog", {
      active: true,
      title: `Move: ${collection.title}`,
      message: body(collection),
      actions: [
        {
          name: "Cancel",
          action: API.actions.collectionRelocation.cancel
        },
        {
          name: "Submit",
          action: () => API.actions.collectionRelocation.updateCollection()
        }
      ]
    });
  };

  const sharedActions = [
    {
      name: "Move",
      method: openMoveSelectorDialog
    },
    {
      name: "Delete",
      method: async (collection: Required<Collection>) => {
        await API.system.Requests.collection.delete(collection.id);
      }
    }
  ];

  return (
    <Table<Collection>
      data={collections}
      columns={columns}
      actions={[...actions, ...sharedActions]}
      metaTestId={metaTestId}
      selectable={{ visible: bulkOrder.active, selected, onChange }}
    />
  );
};
