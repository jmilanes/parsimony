import React, { useEffect } from "react";
import {
  serviceProviderOptions,
  userRoleOptions,
  userRoleOptionsWithStringValues
} from "../fixtures";

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
  Domains,
  IModes,
  Program,
  Routes,
  UpdateUserPayload,
  User,
  UserPageMetaTestIds,
  UserRoles
} from "@parsimony/types";

import {
  clone,
  getFullName,
  getRouterParams,
  isEditMode,
  isReadOnlyMode,
  navigateToRoute,
  omitMongoKeys
} from "../utils";

import { IColumns, ITableAction } from "../components/table.component";
import { useServices } from "../context";
import { message } from "antd";
import { Container as DI } from "typedi";
import { CommandService } from "../domains/commands/command.service";

const User = () => {
  const CS = DI.get(CommandService);
  const { stateManager } = useServices();
  const { userId } = getRouterParams();
  const navigate = navigateToRoute();

  const user = CS.api.getItem<User>({
    domain: Domains.User,
    id: userId || ""
  });

  const [mode, updateMode] = React.useState<IModes>("readOnly");

  // TODO Look into that observable state hook this is gross
  const [localState, updateLocalState] =
    React.useState<UpdateUserPayload>(user);

  useEffect(() => {
    // TODO This not working not returning the programs.
    CS.api.makeRequest({
      domain: Domains.Program,
      requestType: "getAllByRelationship",
      payload: {
        relationshipProperty: "clientId",
        id: userId
      }
    });

    if (!user) {
      CS.api.makeRequest({
        domain: Domains.User,
        requestType: "get",
        payload: userId
      });
    }

    if (!localState) {
      updateLocalState(clone(user) as User);
    }
  }, [user]);

  const associatedPrograms = CS.api.getItems({
    domain: Domains.Program
  });

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitForm = () => {
    // TODO: Make an error interface
    if (!localState.email) message.error("Please provide email");
    // TODO: Make this better
    localState.email = localState.email?.toLowerCase();

    CS.api.makeRequest({
      domain: Domains.User,
      requestType: "update",
      payload: omitMongoKeys(localState)
    });

    updateMode("readOnly");
  };

  const columns: IColumns[] = [
    {
      key: "title",
      dataIndex: "title",
      title: "title"
    },
    { key: "targetStyle", dataIndex: "targetStyle", title: "Style" },
    { key: "description", dataIndex: "description", title: "description" }
  ];

  const actions: ITableAction[] = [
    {
      name: "Start Observing",
      method: (program: Program) => navigate(`/programs/${program.id}/observe`)
    },
    {
      name: "View Data",
      method: (program: Program) => navigate(`/results/${program.id}`)
    },
    {
      name: "View Program",
      method: (program: Program) => navigate(`/programs/${program.id}`)
    },
    {
      name: "Delete",
      method: (program: Required<Program>) =>
        CS.api.makeRequest({
          domain: Domains.Program,
          requestType: "delete",
          payload: { id: program.id }
        })
    }
  ];

  if (!user || !localState) return null;
  return (
    <Container>
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
      <Row>
        <Header text="Programs:" size="md" />
        <Button
          name="Add Programs"
          action={() => {
            navigate(`${Routes.Programs}?userId=${user.id}`);
          }}
          metaTestId={UserPageMetaTestIds.addProgram}
        />
      </Row>
      <Table<Program>
        //TODO: getCurrentDomainItems should return the proper type
        data={associatedPrograms as Program[]}
        columns={columns}
        actions={actions}
        name="user-program-table"
        metaTestId={UserPageMetaTestIds.programsTable}
      ></Table>
      <Header text="Client Files" size="sm" />
      <p>Upload your client files here:</p>
      {/* //TODO FIX FILE UPLOAD */}
      {/* <FileUpload></FileUpload> */}
    </Container>
  );
};

export default User;
