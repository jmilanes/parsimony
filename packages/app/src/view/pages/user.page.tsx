import React from "react";
import {
  serviceProviderOptions,
  userRoleOptions,
  userRoleOptionsWithStringValues
} from "../../fixtures";

import {
  Button,
  Container,
  Field,
  Header,
  MultiSelect,
  Row,
  Selector,
  Table
} from "../components";

import {
  Collection,
  Domains,
  IModes,
  Program,
  Routes,
  User,
  UserPageMetaTestIds,
  UserRoles
} from "@parsimony/types/dist";

import {
  clone,
  getFullName,
  getRouterParams,
  isEditMode,
  isReadOnlyMode,
  omitMongoKeys
} from "../../utils";

import { ITableAction } from "../components/table.component";

import { message, Spin } from "antd";
import { Container as DI } from "typedi";
import { useAsync } from "react-use";
import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";
import CollectionViewerContainer from "../containers/collection/collecitonViewer.container";

const User = () => {
  const API = DI.get(UIApi);
  const stateManager = API.system.StateService;
  const { userId } = getRouterParams();
  const navigate = API.Navigation;
  const [mode, updateMode] = React.useState<IModes>("readOnly");
  const [selectedCollection, updateSelectedCollection] =
    React.useState<string>();
  const [localState, updateLocalState] = React.useState<User>();

  const { loading } = useAsync(async () => {
    await API.system.makeRequest({
      domain: Domains.Collection,
      requestType: "getAllByRelationship",
      payload: {
        relationshipProperty: "clientId",
        id: userId
      }
    });

    await API.system.makeRequest({
      domain: Domains.Program,
      requestType: "getAllByRelationship",
      payload: {
        relationshipProperty: "clientId",
        id: userId
      }
    });

    await API.system.makeRequest({
      domain: Domains.User,
      requestType: "get",
      payload: { id: userId }
    });

    const user = API.system.getItem(Domains.User, userId);
    updateLocalState(clone(user) as User);
  });

  if (loading || !localState) return <Spin />;

  const user = API.system.getItem(Domains.User, userId);

  const topLevelCollections = API.system
    .getItemsFromStore(Domains.Collection)
    .filter((c) => c.clientId === userId && !c.ancestors?.length);

  const topLevelPrograms = API.system
    .getItemsFromStore(Domains.Program)
    .filter((c) => c.clientId === userId);

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitForm = async () => {
    // TODO: Make an error interface
    if (!localState.email) message.error("Please provide email");
    // TODO: Make this better
    localState.email = localState.email?.toLowerCase();

    await API.system.makeRequest({
      domain: Domains.User,
      requestType: "update",
      payload: omitMongoKeys(localState)
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

  if (!user || !localState) return null;
  return (
    <>
      <Header
        text={getFullName(user)}
        size="page"
        extra={[
          <Button
            key="edit"
            name="Edit"
            action={() => updateMode("edit")}
            hidden={isEditMode(mode)}
            metaTestId={UserPageMetaTestIds.edit}
          />,
          <Button
            key="cancel"
            name="Cancel"
            action={() => {
              updateMode("readOnly");
              updateLocalState(user);
            }}
            hidden={isReadOnlyMode(mode)}
            metaTestId={UserPageMetaTestIds.cancelEdit}
          />,
          <Button
            key="save"
            name="Save"
            action={submitForm}
            hidden={isReadOnlyMode(mode)}
            metaTestId={UserPageMetaTestIds.submitEdit}
          />
        ]}
      />
      <Field
        placeHolderText="First Name"
        pathToState="firstName"
        value={localState.firstName}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={UserPageMetaTestIds.firstNameField}
      />
      <Field
        placeHolderText="Last Name"
        pathToState="lastName"
        value={localState.lastName}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={UserPageMetaTestIds.lastNameField}
      />
      <Field
        placeHolderText="Phone Number"
        pathToState="phone"
        value={localState.phone}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={UserPageMetaTestIds.phoneNumberField}
      />
      <Field
        placeHolderText="Email"
        pathToState="email"
        value={localState.email}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={UserPageMetaTestIds.emailField}
      />
      <Selector
        title="Type"
        options={userRoleOptionsWithStringValues}
        pathToState="type"
        value={localState.type}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={UserPageMetaTestIds.typeSelector}
      />
      <MultiSelect
        title="Role"
        options={userRoleOptions}
        pathToState="roles"
        values={localState.roles as string[]}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={UserPageMetaTestIds.roleMultiSelector}
      />
      {!user.roles?.includes(UserRoles.Client) && (
        <Selector
          title="Service Provider"
          options={serviceProviderOptions}
          pathToState="serviceProvider"
          value={localState.serviceProvider}
          updateState={updateState}
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
