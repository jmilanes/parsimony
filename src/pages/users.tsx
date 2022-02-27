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
import { IUser } from "../types";
import { AddForm } from "../containers";
import {
  initialUserData,
  userRoleOptions,
  userRoleOptionsWithStringValues
} from "../fixtures";
import { IColumns, ITableAction } from "../components/table";
import { Pages } from "../enums";

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
    { propertyKey: "firstName" },
    { propertyKey: "lastName" }
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
      <Header text={Pages.Users} size="lg" />
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
      <Table data={data} columns={columns} actions={actions} />
      <AddForm showForm={showAddForm} action={submitAddForm} title="Add Users">
        <Field
          placeHolderText="First Name"
          pathToState="contactInformation.firstName"
          value={localState.contactInformation?.firstName}
          updateState={updateState}
        />
        <Field
          placeHolderText="Last Name"
          pathToState="contactInformation.lastName"
          value={localState.contactInformation?.lastName}
          updateState={updateState}
        />
        <Field
          placeHolderText="Phone Number"
          pathToState="contactInformation.phone"
          value={localState.contactInformation?.phone}
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
          title="Type"
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
