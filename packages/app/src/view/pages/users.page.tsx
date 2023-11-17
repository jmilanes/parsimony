import React, { useMemo } from "react";

import {
  Button,
  Field,
  Header,
  MultiSelect,
  Selector,
  Table
} from "../components";
import { navigateToRoute } from "../../utils";
import {
  Domains,
  DirectoryPageMetaTestIds,
  Pages,
  User,
  UserPageMetaTestIds,
  UserRoles,
  LoginPayload
} from "@parsimony/types/dist";
import { AddForm } from "../containers";
import {
  initialUserData,
  serviceProviderOptions,
  userRoleOptions,
  userRoleOptionsWithStringValues
} from "../../fixtures";
import { IColumns, ITableAction } from "../components/table.component";

import { message } from "antd";
import { Container } from "typedi";

import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";

const Users = () => {
  const API = Container.get(UIApi);
  const navigate = navigateToRoute();
  const [showAddForm, setShowAddForm] = React.useState(false);

  const users = API.system.getItemsFromStore(Domains.User);

  const form = useMemo(
    () =>
      //Need to destroy on use effect
      API.system.Form.create<Partial<User>>(initialUserData),
    []
  );

  const submitAddForm = async () => {
    const isNotClient = form.Data.type !== UserRoles.Client;

    if (!form.Data.email && isNotClient) {
      message.error("Please provide email");
      return;
    }

    form.Data.email = form.Data.email?.toLowerCase();

    await API.system.makeRequest({
      domain: Domains.User,
      requestType: "create",
      payload: {
        ...form.Data,
        schoolId: API.system.Auth.getCurrentUser()?.schoolId
      }
    });

    setShowAddForm(false);
    form.reset();
  };

  const columns: IColumns[] = [
    { key: "firstName", title: "First Name" },
    { key: "lastName", title: "Last Name" },
    { key: "type", title: "Type" }
  ];

  const actions: ITableAction[] = [
    {
      name: "View",
      method: (user: User) => navigate(`/directory/${user.id}`)
    },
    {
      name: "Delete",
      method: async (user: Required<User>) => {
        await API.system.makeRequest({
          domain: Domains.User,
          requestType: "delete",
          payload: {
            id: user.id
          }
        });
      }
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
        data={users}
        columns={columns}
        actions={actions}
        name="Directory"
        metaTestId={DirectoryPageMetaTestIds.table}
      />
      <AddForm
        showForm={showAddForm}
        onCreate={submitAddForm}
        title="Add User"
        onCancel={() => {
          setShowAddForm(false);
          form.reset();
        }}
      >
        <Field
          placeHolderText="First Name"
          value={form.Data.firstName}
          updateState={(_, value) => form.updateData({ firstName: value })}
          metaTestId={DirectoryPageMetaTestIds.firstNameField}
        />
        <Field
          placeHolderText="Last Name"
          value={form.Data.lastName}
          updateState={(_, value) => form.updateData({ lastName: value })}
          metaTestId={DirectoryPageMetaTestIds.lastNameField}
        />
        <Field
          placeHolderText="Phone Number"
          value={form.Data.phone}
          updateState={(_, value) => form.updateData({ phone: value })}
          metaTestId={DirectoryPageMetaTestIds.phoneNumberField}
        />
        <Field
          placeHolderText="Email"
          value={form.Data.email}
          updateState={(_, value) => form.updateData({ email: value })}
          metaTestId={DirectoryPageMetaTestIds.emailField}
        />
        <Selector
          title="Type"
          options={userRoleOptionsWithStringValues}
          value={form.Data.type}
          updateState={(_, value) => form.updateData({ type: value as string })}
          metaTestId={DirectoryPageMetaTestIds.typeSelector}
        />
        <MultiSelect
          title="Roles"
          options={userRoleOptions}
          values={form.Data.roles as string[]}
          updateState={(_, value) => {
            form.updateData({ roles: value });
          }}
          metaTestId={DirectoryPageMetaTestIds.roleMultiSelector}
        />
        {form.Data.roles?.length &&
          !form.Data.roles?.includes(UserRoles.Client) && (
            <Selector
              title="Service Provider"
              options={serviceProviderOptions}
              value={form.Data.serviceProvider}
              updateState={(_, value) =>
                form.updateData({ serviceProvider: value as string })
              }
              metaTestId={UserPageMetaTestIds.serviceProviderSelector}
            />
          )}
      </AddForm>
    </>
  );
};

export default Users;
