import React, { useEffect } from "react";
import { userRoleOptions, userRoleOptionsWithStringValues } from "../fixtures";

import {
  Header,
  Container,
  Field,
  Selector,
  MultiSelect,
  Button,
  Table,
  Row,
  FileUpload
} from "../components";

import {
  Collections,
  IModes,
  Program,
  UpdateUserPayload,
  User,
  UserPageMetaTestIds
} from "@parsimony/types";

import {
  getFullName,
  getRouterParams,
  isEditMode,
  isReadOnlyMode,
  omitMongoKeys
} from "../utils";
import { navigateToRoute } from "../utils";
import { Routes } from "@parsimony/types";
import { IColumns, ITableAction } from "../components/table.component";
import { useServices } from "../context";

const User = () => {
  const { filterService, stateManager, dataAccess, store } = useServices();
  const { userId } = getRouterParams();
  const navigate = navigateToRoute();

  const user = store.getCollectionItem(Collections.User, userId || "");

  const [mode, updateMode] = React.useState<IModes>("readOnly");

  // TODO Look into that observable state hook this is gross
  const [localState, updateLocalState] =
    React.useState<UpdateUserPayload>(user);

  useEffect(() => {
    dataAccess.program.getAllByRelationship("clientId", userId);
    if (!user) dataAccess.user.get(userId);
    if (!localState) updateLocalState(user);
  }, [user]);

  const associatedPrograms = store.getCurrentCollectionItems(
    Collections.Program
  );

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitForm = () => {
    dataAccess.user.update(omitMongoKeys(localState));
    updateMode("readOnly");
  };

  const columns: IColumns[] = [
    { key: "title", dataIndex: "title", title: "title" },
    { key: "description", dataIndex: "description", title: "description" }
  ];

  const actions: ITableAction[] = [
    {
      name: "Start Observing",
      method: (program: Program) => navigate(`/programs/${program.id}/observe`),
      metaTestId: UserPageMetaTestIds.programTableActionStartObserving
    },
    {
      name: "View Data",
      method: (program: Program) => navigate(`/results/${program.id}`),
      metaTestId: UserPageMetaTestIds.programTableActionViewData
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
            action={() => updateMode("readOnly")}
            hidden={isReadOnlyMode(mode)}
            metaTestId={UserPageMetaTestIds.cancelEdit}
          />,
          <Button
            key="submit"
            name="Submit"
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
        title="Type"
        options={userRoleOptions}
        pathToState="roles"
        values={localState.roles as string[]}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={UserPageMetaTestIds.roleMultiSelector}
      />
      <Row>
        <Header text="Programs:" size="md" />
        <Button
          name="Add Programs"
          action={() => {
            filterService.setFromLink();
            filterService.addFilter(
              "main",
              (data: any) => data.type === "MAIN"
            );
            navigate(`${Routes.Programs}?userId=${user.id}`);
          }}
          metaTestId={UserPageMetaTestIds.addProgram}
        />
      </Row>
      <Table<Program>
        //TODO: getCurrentCollectionItems should return the proper type
        data={associatedPrograms as Program[]}
        columns={columns}
        actions={actions}
      ></Table>
      <Header text="Client Files" size="sm" />
      <p>Upload your client files here:</p>
      {/* //TODO FIX FILE UPLOAD */}
      {/* <FileUpload></FileUpload> */}
    </Container>
  );
};

export default User;
