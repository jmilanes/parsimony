import React, { useMemo } from "react";
import {
  serviceProviderOptions,
  userRoleOptions,
  userRoleOptionsWithStringValues
} from "../../fixtures";

import { Button, Field, Header, Selector } from "../components";

import {
  Collection,
  Domains,
  IModes,
  Program,
  User,
  UserPageMetaTestIds,
  UserRoles
} from "@parsimony/types";

import {
  getFullName,
  getRouterParams,
  isEditMode,
  isReadOnlyMode
} from "../../utils";

import { ITableAction } from "../components/table.component";

import { message, Spin } from "antd";
import { Container as DI } from "typedi";
import { useAsync } from "react-use";
import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";
import CollectionViewerContainer from "../containers/collection/collecitonViewer.container";

const User = () => {
  const API = DI.get(UIApi);

  const { userId } = getRouterParams();
  const navigate = API.Navigate;
  const [mode, updateMode] = React.useState<IModes>("readOnly");

  const [selectedCollection, updateSelectedCollection] =
    React.useState<string>();

  const { loading, value: form } = useAsync(async () => {
    // Feels like this should move to orcestration
    // This is why you would want a better accessor pattern
    /// API.actions.collection.fetchByClientId
    await API.system.makeRequest({
      domain: Domains.Collection,
      requestType: "getAllByRelationship",
      payload: {
        relationshipProperty: "clientId",
        id: userId
      }
    });

    /// API.actions.program.fetchByClientId
    await API.system.makeRequest({
      domain: Domains.Program,
      requestType: "getAllByRelationship",
      payload: {
        relationshipProperty: "clientId",
        id: userId
      }
    });

    /// API.actions.program.fetchByClientId
    await API.system.makeRequest({
      domain: Domains.User,
      requestType: "get",
      payload: { id: userId }
    });

    const user = API.system.getItem(Domains.User, userId);
    //Need to destroy on use effect
    return API.system.Form.create<User>(user);
  });

  if (!form || loading) {
    return <Spin />;
  }

  const user = API.system.getItem(Domains.User, userId);

  const topLevelCollections = API.system
    .getItemsFromStore(Domains.Collection)
    .filter((c) => c.clientId === userId && !c.ancestors?.length);

  const topLevelPrograms = API.system
    .getItemsFromStore(Domains.Program)
    .filter((c) => c.clientId === userId);

  const submitForm = async () => {
    // TODO: Make an error interface
    if (!form.Data.email) message.error("Please provide email");
    // TODO: Make this better
    form.Data.email = form.Data.email?.toLowerCase();

    await API.system.makeRequest({
      domain: Domains.User,
      requestType: "update",
      payload: form.Data
    });

    updateMode("readOnly");
  };

  const actions: ITableAction[] = [
    {
      name: "Start Observing",
      method: (program: Program) => navigate(`/programs/${program.id}/observe`)
    },
    {
      name: "View Data",
      method: (program: Program) => navigate(`/results/${program.id}`)
    }
  ];

  const collectionActions: ITableAction[] = [
    {
      name: "Select",
      method: (collection: Collection) =>
        updateSelectedCollection(collection?.id)
    },
    {
      name: "Edit",
      method: (collection: Collection) => navigate(`/books/${collection.id}`)
    }
  ];

  const ancestorAction = (c?: Collection) =>
    c ? updateSelectedCollection(c.id) : updateSelectedCollection(undefined);

  if (!user || !form) return null;
  return (
    <>
      <Header
        text={getFullName(user)}
        size="page"
        extra={[
          <Button
            key="edit"
            name="Edit"
            onClick={() => updateMode("edit")}
            hidden={isEditMode(mode)}
            metaTestId={UserPageMetaTestIds.edit}
          />,
          <Button
            key="cancel"
            name="Cancel"
            onClick={() => {
              updateMode("readOnly");
              form.reset();
            }}
            hidden={isReadOnlyMode(mode)}
            metaTestId={UserPageMetaTestIds.cancelEdit}
          />,
          <Button
            key="save"
            name="Save"
            onClick={submitForm}
            hidden={isReadOnlyMode(mode)}
            metaTestId={UserPageMetaTestIds.submitEdit}
          />
        ]}
      />
      <Field
        placeHolderText="First Name"
        value={form.Data.firstName}
        onChange={(value) => form.updateData({ firstName: value })}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={UserPageMetaTestIds.firstNameField}
      />
      <Field
        placeHolderText="Last Name"
        value={form.Data.lastName}
        onChange={(value) => form.updateData({ lastName: value })}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={UserPageMetaTestIds.lastNameField}
      />
      <Field
        placeHolderText="Phone Number"
        value={form.Data.phone}
        onChange={(value) => form.updateData({ phone: value })}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={UserPageMetaTestIds.phoneNumberField}
      />
      <Field
        placeHolderText="Email"
        value={form.Data.email}
        onChange={(value) => form.updateData({ email: value })}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={UserPageMetaTestIds.emailField}
      />
      <Selector
        title="Type"
        options={userRoleOptionsWithStringValues}
        value={form.Data.type}
        onChange={(value) => {
          form.updateData({ type: value as UserRoles });
        }}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={UserPageMetaTestIds.typeSelector}
      />
      <Selector
        title="Role"
        options={userRoleOptions}
        multiple={true}
        value={form.Data.roles}
        onChange={(value) => {
          form.updateData({ roles: value as UserRoles[] });
        }}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={UserPageMetaTestIds.roleMultiSelector}
      />
      {!user.roles?.includes(UserRoles.Client) && (
        <Selector
          title="Service Provider"
          options={serviceProviderOptions}
          value={form.Data.serviceProvider}
          onChange={(value) =>
            form.updateData({ serviceProvider: value as string })
          }
          readOnly={isReadOnlyMode(mode)}
          metaTestId={UserPageMetaTestIds.serviceProviderSelector}
        />
      )}
      {selectedCollection ? (
        <CollectionViewerContainer
          ancestorRootText={`${getFullName(user)} Collections`}
          header={true}
          collectionId={selectedCollection}
          collectionActions={collectionActions}
          programActions={actions}
          ancestorAction={ancestorAction}
        />
      ) : (
        <CollectionViewerContainer
          header={true}
          collectionActions={collectionActions}
          programActions={actions}
          passedCollections={topLevelCollections}
          passedPrograms={topLevelPrograms}
        />
      )}
    </>
  );
};

export default User;
