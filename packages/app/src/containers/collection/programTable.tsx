import React from "react";

import {
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
    },
    {
      name: "Add to Client",
      method: async (program: Required<Program>) => {
        // TODO: This should be handled in server and made to do bulk experience around this
        const userId = searchParams.get("userId");
        const latestProgram = API.getItem(Domains.Program, program.id);
        latestProgram.mainProgramId = program.id;
        const payload = omitMongoKeys(
          removeMongoIds({
            ...latestProgram,
            title: `${latestProgram.title}`,
            clientId: userId || null,
            type: ProgramTypes.Client
          })
        );

        await API.makeRequest({
          domain: Domains.Program,
          requestType: "create",
          payload
        });

        message.success("Program Added");
      }
    }
  ];

  return (
    <Table<Program>
      data={programs}
      columns={columns}
      actions={actions}
      name="Programs"
      metaTestId={ProgramsPageMetaTestIds.table}
    />
  );
};
