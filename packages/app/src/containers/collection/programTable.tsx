import React, { useEffect } from "react";

import {
  ProgramsPageMetaTestIds,
  ProgramTypes,
  Program,
  Domains,
  User,
  Routes,
  CreateProgramPayload
} from "@parsimony/types";

import { IColumns, ITableAction, Table } from "../../components";

import { useServices } from "../../context";
import { Container } from "typedi";
import { CommandService } from "../../domains/commands/command.service";
import {
  createList,
  getFullName,
  getLength,
  getSearchParams,
  navigateToRoute,
  omitMongoKeys,
  removeMongoIds
} from "../../utils";

export type IProgramTableProps = React.PropsWithChildren<{
  programs: Program[];
}>;

export const ProgramTable = ({ programs }: IProgramTableProps) => {
  const CS = Container.get(CommandService);
  const { dataAccess } = useServices();
  const navigate = navigateToRoute();
  let [searchParams] = getSearchParams();

  useEffect(() => {
    CS.api.makeRequest({
      domain: Domains.User,
      requestType: "getAll"
    });
  }, []);

  const clients = CS.api.getItems<User[]>({
    domain: Domains.User
  });

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
      method: (program: Required<Program>) => {
        CS.api.makeRequest({
          domain: Domains.Program,
          requestType: "delete",
          payload: { id: program.id }
        });
      }
    },
    {
      name: "Add to Client",
      method: async (program: Required<Program>) => {
        // TODO: This should be handled in server and made to do bulk things
        const latestProgram = CS.api.getItem<Program>({
          domain: Domains.Program,
          id: program.id
        });

        latestProgram.mainProgramId = program.id;
        const userId = searchParams.get("userId");
        const payload = omitMongoKeys(
          removeMongoIds({
            ...latestProgram,
            title: `${latestProgram.title}_Copy`,
            clientId: userId || null,
            type: ProgramTypes.Client
          })
        );

        // TODO: THIS is a pattern brake should be handled server side (Will fix)
        const createdProgram = await dataAccess.program.create(
          payload as CreateProgramPayload
        );
        navigate(`/programs/${createdProgram?.id}?mode=edit`);
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
