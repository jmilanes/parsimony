import React from "react";

import { Button, Table, Field, Header } from "../components";
import { School } from "@parsimony/types";
import { AddForm } from "../containers";
import { initialSchoolData } from "../fixtures";
import { IColumns, ITableAction } from "../components/table.component";
import { Pages } from "@parsimony/types";

import { useServices } from "../context";

const Users = () => {
  const { stateManager, dataAccess } = useServices();

  const schoolData = dataAccess.school.getAll();

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [localState, updateLocalState] =
    React.useState<Partial<School>>(initialSchoolData);

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitAddForm = () => {
    dataAccess.school.create(localState);
    setShowAddForm(false);
    updateLocalState(initialSchoolData);
  };

  const columns: IColumns[] = [
    { key: "name", dataIndex: "name", title: "name" }
  ];

  const actions: ITableAction[] = [
    {
      name: "Delete",
      method: (school: Required<School>) =>
        dataAccess.school.delete({ id: school.id })
    }
  ];

  return (
    <>
      <Header
        text={Pages.School}
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
      <Table data={schoolData} columns={columns} actions={actions} />
      <AddForm
        showForm={showAddForm}
        onCreate={submitAddForm}
        title="Add User"
        onCancel={() => setShowAddForm(false)}
      >
        <Field
          placeHolderText="School Name"
          pathToState="name"
          value={localState.name}
          updateState={updateState}
        />
      </AddForm>
    </>
  );
};

export default Users;
