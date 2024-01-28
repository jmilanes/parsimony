import React, { useMemo } from "react";

import { Domains, Program, ProgramsPageMetaTestIds } from "@parsimony/types";

import { IColumns, ITableAction, Table } from "../../components";

import { Container } from "typedi";

import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

import { createBulkOrderSelectable } from "../program/bulkPrograms/helpers";
import { CollectionSelectorContainer } from "./collectionSelector.container";
import { clone, removeMongoIds } from "../../../utils";

export type IProgramTableProps = React.PropsWithChildren<{
  programs: Program[];
  actions?: ITableAction[];
  columns: IColumns[];
}>;

export const ProgramTable = ({
  programs,
  actions = [],
  columns
}: IProgramTableProps) => {
  const API = Container.get(UIApi);
  const navigate = API.Navigate;

  const bulkOrder = API.system.getAppState("bulkPrograms");
  // Comm
  const { onChange, selected } = useMemo(() => {
    return createBulkOrderSelectable<Program>(
      "collectionId",
      "programIds",
      "collectionIds"
    );
  }, []);

  const body = (program: Program) => {
    return <CollectionSelectorContainer entity={program} />;
  };

  const openMoveSelectorDialog = (program: Program) => {
    API.system.updateAppState("dialog", {
      active: true,
      title: `Move: ${program.title}`,
      message: body(program),
      actions: [
        {
          name: "Cancel",
          action: API.actions.collectionRelocation.cancel
        },
        {
          name: "Submit",
          action: () =>
            API.actions.collectionRelocation.updateEntity(Domains.Program)
        }
      ]
    });
  };

  const sharedActions = [
    {
      name: "View",
      method: (program: Program) => navigate(`/programs/${program.id}`)
    },
    {
      name: "Delete",
      method: async (program: Required<Program>) => {
        await API.system.makeRequest({
          domain: Domains.Program,
          requestType: "delete",
          payload: { id: program.id }
        });
      }
    },
    {
      name: "Move",
      method: openMoveSelectorDialog
    },
    {
      name: "Copy",
      method: async (program: Program) => {
        const copy = clone(program);
        delete copy.id;
        delete copy["chaining.type"];
        delete copy["behavior.type"];
        copy.title = `${program.title}_copy`;
        if (!program.behavior?.type) {
          delete copy.behavior;
        }
        if (!program.chaining?.type) {
          delete copy.chaining;
        }
        if (!program.category) {
          delete copy.category;
        }
        await API.system.makeRequest({
          domain: Domains.Program,
          requestType: "create",
          payload: removeMongoIds(copy)
        });
      }
    }
  ];

  return (
    <Table<Program>
      data={programs}
      columns={columns}
      actions={[...actions, ...sharedActions]}
      metaTestId={ProgramsPageMetaTestIds.table}
      selectable={{ visible: bulkOrder.active, selected, onChange }}
    />
  );
};
