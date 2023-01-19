import React, { useEffect } from "react";
import { IColumns, ITableAction } from "../components/table.component";
import { AddForm, RulesForm } from "../containers";
import {
  Collections,
  Pages,
  ProgramsPageMetaTestIds,
  User
} from "@parsimony/types";
import {
  initialProgramData,
  programTypes,
  ruleStyles,
  userRoleOptions
} from "../fixtures";
import { IId, Program } from "@parsimony/types";
import {
  createList,
  getFullName,
  getLength,
  getSearchParams,
  navigateToRoute,
  omitMongoKeys,
  removeMongoIds
} from "../utils";
import {
  Button,
  Header,
  Field,
  Table,
  MultiSelect,
  Selector
} from "../components";
import { ProgramTypes } from "@parsimony/types";
import { useServices } from "../context";

const Programs = () => {
  const { stateManager, dataAccess, store } = useServices();
  const navigate = navigateToRoute();
  let [searchParams] = getSearchParams();

  const data = store.getCurrentCollectionItems<Program>(Collections.Program);

  useEffect(() => {
    dataAccess.program.getAll();
    dataAccess.user.getAll();
  }, []);

  const clients = store.getCurrentCollectionItems<User>(Collections.User);

  const clientDataOptions = clients.map((client: User) => ({
    name: getFullName(client),
    value: client.id
  }));

  const getClientFullName = (clients: User[]) => (id: string) =>
    getFullName(clients.find((client: User) => client.id === id));

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [localState, updateLocalState] =
    React.useState<Program>(initialProgramData);

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitAddForm = () => {
    dataAccess.program.create(removeMongoIds(localState));
    setShowAddForm(false);
    updateLocalState(initialProgramData);
  };

  const columns: IColumns[] = [
    { key: "title", title: "title", dataIndex: "title" },
    {
      key: "clientId",
      title: "Client Id",
      dataIndex: "clientId",
      displayFn: getClientFullName(clients)
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
    { key: "rules", title: "Rules", dataIndex: "rules", displayFn: getLength }
  ];

  const actions: ITableAction[] = [
    {
      name: "View",
      method: (program: Program) => navigate(`/programs/${program.id}`)
    },
    {
      name: "Delete",
      method: (program: Required<Program>) =>
        dataAccess.program.delete({ id: program.id })
    },
    {
      name: "Copy",
      method: async (program: Required<Program>) => {
        program.mainProgramId = program.id;
        const userId = searchParams.get("userId");
        const payload = omitMongoKeys(
          removeMongoIds({
            ...program,
            title: `${program.title}_Copy`,
            clientId: userId || null,
            type: ProgramTypes.Client
          })
        );
        const createdProgram = await dataAccess.program.create(payload);
        navigate(`/programs/${createdProgram.id}?mode=edit`);
      }
    }
  ];

  return (
    <>
      <Header
        text={Pages.Programs}
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
        data={data}
        columns={columns}
        actions={actions}
        name="Programs"
        metaTestId={ProgramsPageMetaTestIds.table}
      />
      <AddForm
        showForm={showAddForm}
        onCreate={submitAddForm}
        onCancel={() => setShowAddForm(false)}
        title="Add Program"
      >
        <Field
          placeHolderText="Title"
          pathToState="title"
          value={localState.title}
          updateState={updateState}
          metaTestId={ProgramsPageMetaTestIds.titleField}
        />
        <Field
          placeHolderText="Description"
          pathToState="description"
          value={localState.description}
          updateState={updateState}
          metaTestId={ProgramsPageMetaTestIds.descriptionField}
        />
        <Selector
          title="Type"
          pathToState="type"
          value={localState.type}
          options={programTypes}
          updateState={updateState}
          metaTestId={ProgramsPageMetaTestIds.typeSelector}
        />
        {localState.type === ProgramTypes.Client && (
          <Selector
            title="Client"
            pathToState="clientId"
            value={localState.clientId}
            options={clientDataOptions}
            updateState={updateState}
            metaTestId={ProgramsPageMetaTestIds.clientSelector}
          />
        )}

        <Selector
          title="Rule Style"
          pathToState="ruleStyle"
          value={localState.ruleStyle}
          options={ruleStyles}
          updateState={updateState}
          metaTestId={ProgramsPageMetaTestIds.ruleStyleSelector}
        />
        <MultiSelect
          title="Read Access"
          pathToState="readAccess"
          options={userRoleOptions}
          values={localState.readAccess as string[]}
          updateState={updateState}
          metaTestId={ProgramsPageMetaTestIds.readAccessMultiSelector}
        />
        <MultiSelect
          title="Write Access"
          pathToState="writeAccess"
          options={userRoleOptions}
          values={localState.writeAccess as string[]}
          updateState={updateState}
          metaTestId={ProgramsPageMetaTestIds.writeAccessMultiSelector}
        />
        <RulesForm localState={localState} updateState={updateState} />
      </AddForm>
    </>
  );
};

export default Programs;
