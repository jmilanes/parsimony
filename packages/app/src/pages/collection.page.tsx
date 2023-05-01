import React, { useEffect } from "react";
import {
  Button,
  Field,
  Header,
  IColumns,
  ITableAction,
  MultiSelect,
  Selector,
  Table
} from "../components";
import { AddForm, ProgramAddForm, TargetForm } from "../containers";
import {
  CreateProgramPayload,
  Pages,
  Program,
  ProgramsPageMetaTestIds,
  ProgramTypes,
  Routes,
  Domains,
  TargetOption,
  User,
  Collection
} from "@parsimony/types";
import {
  initialProgramData,
  programCategories,
  programTypes,
  targetStyles,
  trialOptions,
  userRoleOptions
} from "../fixtures";
import {
  createList,
  getFullName,
  getLength,
  getRouterParams,
  getSearchParams,
  navigateToRoute,
  omitMongoKeys,
  removeMongoIds
} from "../utils";
import { useServices } from "../context";
import { TargetOptionSelector } from "../containers/targetOptionsSelector.container";
import { Container } from "typedi";
import { CommandService } from "../domains/commands/command.service";

const Collection = () => {
  const CS = Container.get(CommandService);
  const { dataAccess } = useServices();
  const navigate = navigateToRoute();
  const { collectionId } = getRouterParams();
  let [searchParams] = getSearchParams();

  const collection = CS.api.getItem<Collection>({
    domain: Domains.Collection,
    id: collectionId
  });

  useEffect(() => {
    if (collection) {
      CS.api.makeRequest({
        domain: Domains.Program,
        requestType: "getAllByRelationship",
        payload: {
          relationshipProperty: "collections",
          id: collection.programs
        }
      });

      CS.api.makeRequest({
        domain: Domains.User,
        requestType: "getAll"
      });
    } else {
      CS.api.makeRequest({
        domain: Domains.Collection,
        requestType: "getAll"
      });
    }
  }, [collection]);

  const programs = CS.api
    .getItems<Program[]>({
      domain: Domains.Program
    })
    .filter((p) => p.type === "MAIN");

  const clients = CS.api.getItems<User[]>({
    domain: Domains.User
  });

  const getClientFullName = (clients: User[]) => (id: string) =>
    getFullName(clients.find((client: User) => client.id === id));

  const [showAddForm, setShowAddForm] = React.useState(false);

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
    <>
      <Header
        text={`Collection: ${collection?.title}`}
        size="page"
        extra={[
          <Button
            key="add"
            name="Add"
            action={() => setShowAddForm(true)}
            hidden={showAddForm}
            metaTestId={ProgramsPageMetaTestIds.addBtn}
          />
        ]}
      />
      <Table<Program>
        data={programs}
        columns={columns}
        actions={actions}
        name="Programs"
        metaTestId={ProgramsPageMetaTestIds.table}
      />
      <ProgramAddForm show={showAddForm} setShowCb={setShowAddForm} />
    </>
  );
};

export default Collection;
