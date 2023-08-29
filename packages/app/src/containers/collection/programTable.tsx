import React, { useMemo } from "react";

import { Domains, Program, ProgramsPageMetaTestIds } from "@parsimony/types";

import { IColumns, ITableAction, Table } from "../../components";

import { Container } from "typedi";
import { navigateToRoute } from "../../utils";

import UIApi from "../../domains/uiApi/uiApi.Service";

import { createBulkOrderSelectable } from "../bulkPrograms/helpers";

export type IProgramTableProps = React.PropsWithChildren<{
  programs: Program[];
  actions: ITableAction[];
  columns: IColumns[];
}>;

export const ProgramTable = ({
  programs,
  actions,
  columns
}: IProgramTableProps) => {
  const API = Container.get(UIApi);

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
