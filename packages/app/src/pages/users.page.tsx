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
import { Collections, DirectoryPageMetaTestIds, User } from "@parsimony/types";
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
import { message } from "antd";

const Users = () => {
  const { stateManager, dataAccess, store } = useServices();
  const navigate = navigateToRoute();
  const data = store.getCurrentCollectionItems<User>(Collections.User);

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
    if (!localState.email) message.error("Please provide email");
    // TODO: Make this better
    localState.email = localState.email?.toLowerCase();
    dataAccess.user.create(localState);
    setShowAddForm(false);
    updateLocalState(initialUserData);
  };

  const columns: IColumns[] = [
    { key: "firstName", dataIndex: "firstName", title: "First Name" },
    { key: "lastName", dataIndex: "lastName", title: "Last Name" },
    { key: "type", dataIndex: "type", title: "Type" }
  ];

  const actions: ITableAction[] = [
    {
      name: "View",
      method: (user: User) => navigate(`/directory/${user.id}`)
    },
    {
      name: "Delete",
      method: (user: Required<User>) => dataAccess.user.delete({ id: user.id })
    }
  ];

  return (
    <>
      <Header
        text={Pages.Users}
        size="page"
        extra={[
          <Button
            metaTestId={DirectoryPageMetaTestIds.addUserBtn}
            key="add"
            name="Add"
            action={() => setShowAddForm(true)}
            hidden={showAddForm}
          />
        ]}
      />
      <Table
        data={data}
        columns={columns}
        actions={actions}
        name="Directory"
        metaTestId={DirectoryPageMetaTestIds.table}
      />
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
          metaTestId={DirectoryPageMetaTestIds.firstNameField}
        />
        <Field
          placeHolderText="Last Name"
          pathToState="lastName"
          value={localState.lastName}
          updateState={updateState}
          metaTestId={DirectoryPageMetaTestIds.lastNameField}
        />
        <Field
          placeHolderText="Phone Number"
          pathToState="phone"
          value={localState.phone}
          updateState={updateState}
          metaTestId={DirectoryPageMetaTestIds.phoneNumberField}
        />
        <Field
          placeHolderText="Email"
          pathToState="email"
          value={localState.email}
          updateState={updateState}
          metaTestId={DirectoryPageMetaTestIds.emailField}
        />
        <Field
          placeHolderText="Password"
          pathToState="password"
          value={localState.password}
          updateState={updateState}
          metaTestId={DirectoryPageMetaTestIds.passwordField}
        />
        <Selector
          title="Type"
          options={userRoleOptionsWithStringValues}
          pathToState="type"
          value={localState.type}
          updateState={updateState}
          metaTestId={DirectoryPageMetaTestIds.typeSelector}
        />
        <MultiSelect
          title="Roles"
          options={userRoleOptions}
          pathToState="roles"
          values={localState.roles as string[]}
          updateState={updateState}
          metaTestId={DirectoryPageMetaTestIds.roleMultiSelector}
        />
      </AddForm>
    </>
  );
};

export default Users;
