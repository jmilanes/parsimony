import React from "react";

import { StateManger, userData } from "../services/dataAccessServices";
import {
  Button,
  Table,
  Field,
  MultiSelect,
  Selector,
  Header
} from "../components";
import { navigateToRoute } from "../utils";
import { IUser } from "@parsimony/types";
import { AddForm } from "../containers";
import {
  initialUserData,
  userRoleOptions,
  userRoleOptionsWithStringValues
} from "../fixtures";
import { IColumns, ITableAction } from "../components/table";
import { Pages } from "@parsimony/types";

const Users = () => {
  const navigate = navigateToRoute();
  const data = userData.getAll();
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [localState, updateLocalState] = React.useState<IUser>(initialUserData);

  const updateState = StateManger.updateLocalState({
    localState,
    updateLocalState
  });

  const submitAddForm = () => {
    userData.create(localState);
    setShowAddForm(false);
    updateLocalState(initialUserData);
  };

  const columns: IColumns[] = [
    { key: "firstName", dataIndex: "firstName", title: "firstName" },
    { key: "lastName", dataIndex: "lastName", title: "lastName" },
    { key: "type", dataIndex: "type", title: "type" }
  ];
  const actions: ITableAction[] = [
    {
      name: "View",
      method: (user: IUser) => navigate(`/directory/${user.id}`)
    },
    {
      name: "Delete",
      method: (user: Required<IUser>) => userData.delete(user.id)
    }
  ];

  return (
    <>
      <Header
        text={Pages.Users}
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
      <Table data={data} columns={columns} actions={actions} />
      <AddForm
        showForm={showAddForm}
        onCreate={submitAddForm}
        title="Add User"
        onCancel={() => setShowAddForm(false)}
      >
        <Field
          placeHolderText="First Name"
          pathToState="firstName"
          value={localState.firstName}
          updateState={updateState}
        />
        <Field
          placeHolderText="Last Name"
          pathToState="lastName"
          value={localState.lastName}
          updateState={updateState}
        />
        <Field
          placeHolderText="Phone Number"
          pathToState="phone"
          value={localState.phone}
          updateState={updateState}
        />
        <Selector
          title="Type"
          options={userRoleOptionsWithStringValues}
          pathToState="type"
          value={localState.type}
          updateState={updateState}
        />
        <MultiSelect
          title="Roles"
          options={userRoleOptions}
          pathToState="roles"
          values={localState.roles}
          updateState={updateState}
        />
      </AddForm>
    </>
  );
};

export default Users;
