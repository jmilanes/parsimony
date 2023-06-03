import React, { useMemo } from "react";

import {
  Collection,
  CreateProgramPayload,
  Domains,
  Program,
  ProgramsPageMetaTestIds,
  ProgramTypes,
  Routes,
  User
} from "@parsimony/types";

import { IColumns, ITableAction, Table } from "../../components";

import { useServices } from "../../context";
import { Container } from "typedi";
import {
  createList,
  getFullName,
  getLength,
  getSearchParams,
  navigateToRoute,
  omitMongoKeys,
  removeMongoIds
} from "../../utils";

import UIApi from "../../domains/uiApi/uiApi.Service";
import { message } from "antd";
import { createBulkOrderSelectable } from "../bulkPrograms/helpers";
import { useMap } from "react-use";

export type IProgramTableProps = React.PropsWithChildren<{
  programs: Program[];
}>;

export const ProgramTable = ({ programs }: IProgramTableProps) => {
  const API = Container.get(UIApi);
  const navigate = navigateToRoute();
  let [searchParams] = getSearchParams();
  const clients = API.getItemsFromStore(Domains.User);

  const getClientFullName = (clients: User[]) => (id: string) =>
    getFullName(clients.find((client: User) => client.id === id));

  const columns: IColumns[] = [
    { key: "title", title: "title", dataIndex: "title" },
    {
      key: "clientId",
      title: "Client Id",
      dataIndex: "clientId",
      displayFn: (id) => (
        <a onClick={() => navigate(`${Routes.Users}/${id}`)}>
          {getClientFullName(clients)(id)}
        </a>
      )
    },
    { key: "type", title: "Type", dataIndex: "type" },
    { key: "description", title: "Description", dataIndex: "description" },
    {
      key: "writeAccess",
      title: "Write Access",
      dataIndex: "Write Access",
      displayFn: createList
    },
    {
      key: "readAccess",
      title: "Read Access",
      dataIndex: "readAccess",
      displayFn: createList
    },
    { key: "createBy", title: "Created By", dataIndex: "createBy" },
    {
      key: "targets",
      title: "targets",
      dataIndex: "targets",
      displayFn: getLength
    }
  ];

  const actions: ITableAction[] = [
    {
      name: "View",
      method: (program: Program) => navigate(`/programs/${program.id}`)
    },
    {
      name: "Delete",
      method: async (program: Required<Program>) => {
        await API.makeRequest({
          domain: Domains.Program,
          requestType: "delete",
          payload: { id: program.id }
        });
      }
    }
  ];

  const bulkOrder = API.getAppState("bulkPrograms");

  const isProgramIdSelected = (id: string) => {
    return API.actions.bulkPrograms.isIdIncludedInBulkProgramProperty(
      id,
      "programIds"
    );
  };

  const isIdExcluded = (id: string) =>
    API.actions.bulkPrograms.isIdIncludedInBulkProgramProperty(
      id,
      "excludedIds"
    );

  const isCollectionIdSelected = (id: string) => {
    return API.actions.bulkPrograms.isIdIncludedInBulkProgramProperty(
      id,
      "collectionIds"
    );
  };

  const addIdToBulkProgramsCollectionIds = (id: string) =>
    API.actions.bulkPrograms.addIdToBulkProgramProperty(id, "programIds");

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
