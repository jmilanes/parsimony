import React, { useMemo } from "react";

import { Domains, Program, ProgramsPageMetaTestIds } from "@parsimony/types";

import { IColumns, ITableAction, Table } from "../../components";

import { Container } from "typedi";
import { navigateToRoute } from "../../utils";

import UIApi from "../../domains/uiApi/uiApi.Service";

import { createBulkOrderSelectable } from "../bulkPrograms/helpers";

export type IProgramTableProps = React.PropsWithChildren<{
  programs: Program[];
}>;

export const ProgramTable = ({ programs }: IProgramTableProps) => {
  const API = Container.get(UIApi);
  const navigate = navigateToRoute();

  const columns: IColumns[] = [
    { key: "title", title: "title" },
    { key: "description", title: "Description" },
    { key: "targetStyle", title: "Program Style" },
    { key: "chaining.type", title: "Chaining" }
  ];

  const actions: ITableAction[] = [
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
    }
  ];

  const bulkOrder = API.system.getAppState("bulkPrograms");

  const { onChange, selected } = useMemo(() => {
    return createBulkOrderSelectable<Program>(
      "collectionId",
      "programIds",
      "collectionIds"
    );
  }, []);

  return (
    <Table<Program>
      data={programs}
      columns={columns}
      actions={actions}
      name="Programs"
      metaTestId={ProgramsPageMetaTestIds.table}
      selectable={{ visible: bulkOrder.active, selected, onChange }}
    />
  );
};
