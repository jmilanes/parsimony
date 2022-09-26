import React, { useEffect } from "react";
import { IColumns, ITableAction } from "../components/table.component";
import { AddForm, RulesForm } from "../containers";
import { Collections, Pages, User } from "@parsimony/types";
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

  const data = store.getCurrentList(Collections.Program);

  useEffect(() => {
    dataAccess.program.getAll();
  }, []);

  const clientDataOptions = store
    .getCurrentList(Collections.User)
    .map((client: User) => ({ name: getFullName(client), value: client.id }));

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
    { key: "clientId", title: "clientId", dataIndex: "clientId" },
    { key: "type", title: "type", dataIndex: "type" },
    { key: "description", title: "description", dataIndex: "description" },
    {
      key: "writeAccess",
      title: "writeAccess",
      dataIndex: "writeAccess",
      displayFn: createList
    },
    {
      key: "readAccess",
      title: "readAccess",
      dataIndex: "readAccess",
      displayFn: createList
    },
    { key: "createBy", title: "createBy", dataIndex: "createBy" },
    { key: "rules", title: "rules", dataIndex: "rules", displayFn: getLength }
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
          />
        ]}
      />
      <Table<Program> data={data} columns={columns} actions={actions}></Table>
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
        />
        <Field
          placeHolderText="Description"
          pathToState="description"
          value={localState.description}
          updateState={updateState}
        />
        <Selector
          title="Type"
          pathToState="type"
          value={localState.type}
          options={programTypes}
          updateState={updateState}
        />
        {localState.type === ProgramTypes.Client && (
          <Selector
            title="Client"
            pathToState="clientId"
            value={localState.clientId}
            options={clientDataOptions}
            updateState={updateState}
          />
        )}

        <Selector
          title="Rule Style"
          pathToState="ruleStyle"
          value={localState.ruleStyle}
          options={ruleStyles}
          updateState={updateState}
        />
        <MultiSelect
          title="Read Access"
          pathToState="readAccess"
          options={userRoleOptions}
          values={localState.readAccess as string[]}
          updateState={updateState}
        />
        <MultiSelect
          title="Write Access"
          pathToState="writeAccess"
          options={userRoleOptions}
          values={localState.writeAccess as string[]}
          updateState={updateState}
        />
        <RulesForm localState={localState} updateState={updateState} />
      </AddForm>
    </>
  );
};

export default Programs;
