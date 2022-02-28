import React from "react";
import { IColumns, ITableAction } from "../components/table";
import { AddForm, RulesForm } from "../containers";
import { Pages } from "../enums";
import { initialProgramData, programTypes, userRoleOptions } from "../fixtures";
import { programData, StateManger } from "../services/dataAccessServices";
import { IId, IProgram } from "../types";
import {
  createList,
  getLength,
  getSearchParams,
  navigateToRoute
} from "../utils";
import {
  Button,
  Header,
  Field,
  Table,
  MultiSelect,
  Selector
} from "../components";
import { ProgramTypes } from "../enums";

const Programs = () => {
  const navigate = navigateToRoute();
  let [searchParams] = getSearchParams();
  const data = programData.getAll();

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [localState, updateLocalState] =
    React.useState<IProgram>(initialProgramData);

  const updateState = StateManger.updateLocalState({
    localState,
    updateLocalState
  });

  const submitAddForm = () => {
    programData.create(localState);
    setShowAddForm(false);
    updateLocalState(initialProgramData);
  };

  const columns: IColumns[] = [
    { propertyKey: "title" },
    { propertyKey: "clientId" },
    { propertyKey: "type" },
    { propertyKey: "description" },
    { propertyKey: "writeAccess", displayFn: createList },
    { propertyKey: "readAccess", displayFn: createList },
    { propertyKey: "createBy" },
    { propertyKey: "rules", displayFn: getLength }
  ];

  const actions: ITableAction[] = [
    {
      name: "View",
      method: (program: IProgram) => navigate(`/programs/${program.id}`)
    },
    {
      name: "Delete",
      method: (program: Required<IProgram>) => programData.delete(program.id)
    },
    {
      name: "Copy",
      method: (program: Required<IProgram>) => {
        const id = programData.create({
          ...program,
          title: `${program.title}_Copy`,
          clientId: searchParams.get("userId") as IId,
          id: "",
          type: ProgramTypes.Client
        });
        navigate(`/programs/${id}?mode=edit`);
      }
    }
  ];

  return (
    <>
      <Header text={Pages.Programs} size="lg" />
      <Button
        name="Add"
        action={() => setShowAddForm(true)}
        hidden={showAddForm}
      />
      <Button
        name="Cancel"
        action={() => setShowAddForm(false)}
        hidden={!showAddForm}
      />
      <Table<IProgram> data={data} columns={columns} actions={actions}></Table>
      <AddForm showForm={showAddForm} action={submitAddForm} title="Add Users">
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
        <MultiSelect
          title="Read Access"
          pathToState="readAccess"
          options={userRoleOptions}
          values={localState.readAccess}
          updateState={updateState}
        />
        <MultiSelect
          title="Write Access"
          pathToState="writeAccess"
          options={userRoleOptions}
          values={localState.writeAccess}
          updateState={updateState}
        />
        <RulesForm localState={localState} updateState={updateState} />
      </AddForm>
    </>
  );
};

export default Programs;
