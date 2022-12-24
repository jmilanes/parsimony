import React, { useEffect } from "react";

import {
  Button,
  Table,
  Field,
  MultiSelect,
  Selector,
  Header
} from "../components";
import { navigateToRoute } from "../utils";
import { Collections, DirectoryPageDataIds, User } from "@parsimony/types";
import { AddForm } from "../containers";
import {
  initialUserData,
  userRoleOptions,
  userRoleOptionsWithStringValues
} from "../fixtures";
import { IColumns, ITableAction } from "../components/table.component";
import { Pages } from "@parsimony/types";

import { useServices } from "../context";
import { encrypt } from "@parsimony/utilities";

const Users = () => {
  const { stateManager, dataAccess, store } = useServices();
  const navigate = navigateToRoute();
  const data = store.getCurrentCollectionItems(Collections.User);

  useEffect(() => {
    dataAccess.user.getAll();
  }, []);

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [localState, updateLocalState] =
    React.useState<Partial<User>>(initialUserData);

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitAddForm = () => {
    if (!localState.password) {
      console.error("YOU NEED A PASSWORD");
      return;
    }
    localState.password = encrypt(localState.password);
    dataAccess.user.create(localState);
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
      method: (user: User) => navigate(`/directory/${user.id}`),
      dataId: DirectoryPageDataIds.tableActionView
    },
    {
      name: "Delete",
      method: (user: Required<User>) => dataAccess.user.delete({ id: user.id }),
      dataId: DirectoryPageDataIds.tableActionDelete
    }
  ];

  return (
    <>
      <Header
        text={Pages.Users}
        size="page"
        extra={[
          <Button
            dataTestId={DirectoryPageDataIds.addUserBtn}
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
          dataTestId={DirectoryPageDataIds.firstNameField}
        />
        <Field
          placeHolderText="Last Name"
          pathToState="lastName"
          value={localState.lastName}
          updateState={updateState}
          dataTestId={DirectoryPageDataIds.lastNameField}
        />
        <Field
          placeHolderText="Phone Number"
          pathToState="phone"
          value={localState.phone}
          updateState={updateState}
          dataTestId={DirectoryPageDataIds.phoneNumberField}
        />
        <Field
          placeHolderText="Email"
          pathToState="email"
          value={localState.email}
          updateState={updateState}
          dataTestId={DirectoryPageDataIds.emailField}
        />
        <Field
          placeHolderText="Password"
          pathToState="password"
          value={localState.password}
          updateState={updateState}
          dataTestId={DirectoryPageDataIds.passwordField}
        />
        <Selector
          title="Type"
          options={userRoleOptionsWithStringValues}
          pathToState="type"
          value={localState.type}
          updateState={updateState}
          dataTestId={DirectoryPageDataIds.typeSelector}
        />
        <MultiSelect
          title="Roles"
          options={userRoleOptions}
          pathToState="roles"
          values={localState.roles as string[]}
          updateState={updateState}
          dataTestId={DirectoryPageDataIds.roleMultiSelector}
        />
      </AddForm>
    </>
  );
};

export default Users;
