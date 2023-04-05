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
import { AddForm, TargetForm } from "../containers";
import {
  Collections,
  CreateProgramPayload,
  Pages,
  Program,
  ProgramsPageMetaTestIds,
  ProgramTypes,
  Routes,
  TargetOption,
  User
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
  getSearchParams,
  navigateToRoute,
  omitMongoKeys,
  removeMongoIds
} from "../utils";
import { useServices } from "../context";
import { TargetOptionSelector } from "../containers/targetOptionsSelector.container";

const Programs = () => {
  const { stateManager, dataAccess, store, filterService } = useServices();
  const navigate = navigateToRoute();
  let [searchParams] = getSearchParams();

  useEffect(() => {
    dataAccess.program.getAll();
    dataAccess.user.getAll();
    filterService.addFilter("main", (data: any) => data.type === "MAIN");
  }, []);

  const programs = store.getCurrentCollectionItems<Program>(
    Collections.Program
  );
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
      method: (program: Required<Program>) =>
        dataAccess.program.delete({ id: program.id })
    },
    {
      name: "Add to Client",
      method: async (program: Required<Program>) => {
        const latestProgram = store.getCollectionItem(
          Collections.Program,
          program.id
        );
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
        const createdProgram = await dataAccess.program.create(
          payload as CreateProgramPayload
        );
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
        data={programs}
        columns={columns}
        actions={actions}
        name="Programs"
        metaTestId={ProgramsPageMetaTestIds.table}
      />
      <AddForm
        showForm={showAddForm}
        onCreate={submitAddForm}
        onCancel={() => {
          setShowAddForm(false);
          updateLocalState(initialProgramData);
        }}
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
        <Field
          placeHolderText="Materials"
          pathToState="materials"
          value={localState.materials}
          updateState={updateState}
          metaTestId={ProgramsPageMetaTestIds.materialsField}
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
          title="Trials"
          pathToState="trials"
          value={localState.trials}
          options={trialOptions}
          updateState={updateState}
          isNumber={true}
          metaTestId={ProgramsPageMetaTestIds.stepsSelector}
        />

        <Selector
          title="Target Style"
          pathToState="targetStyle"
          value={localState.targetStyle}
          options={targetStyles}
          updateState={updateState}
          metaTestId={ProgramsPageMetaTestIds.ruleStyleSelector}
        />
        <Selector
          title="Category"
          pathToState="category"
          value={localState.category}
          options={programCategories}
          updateState={updateState}
          metaTestId={ProgramsPageMetaTestIds.categorySelector}
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
        <TargetOptionSelector
          targetOptions={localState.targetOptions as TargetOption[]}
          updateState={updateState}
        />
        <TargetForm localState={localState} updateState={updateState} />
      </AddForm>
    </>
  );
};

export default Programs;
