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
  Row
} from "../components";

import { IModes, Program, UpdateUserPayload, User } from "@parsimony/types";

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
  const { filterService, stateManager, dataAccess } = useServices();
  const { userId } = getRouterParams();
  const navigate = navigateToRoute();

  const user: User = dataAccess.user.get(userId || "");

  const [mode, updateMode] = React.useState<IModes>("readOnly");

  // TODO Look into that observable state hook this is gross
  const [localState, updateLocalState] =
    React.useState<UpdateUserPayload>(user);

  // TODO: Potentially store an array of program ids on the user
  const associatedPrograms = dataAccess.program
    .getAll()
    .filter((program: Program) => program.clientId === user.id);

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
      method: (program: Program) => navigate(`/programs/${program.id}/observe`)
    },
    {
      name: "View Data",
      method: (program: Program) => navigate(`/results/${program.id}`)
    }
  ];

  return (
    <Container>
      <Header
        text={getFullName(localState)}
        size="page"
        extra={[
          <Button
            key="edit"
            name="Edit"
            action={() => updateMode("edit")}
            hidden={isEditMode(mode)}
          />,
          <Button
            key="cancel"
            name="Cancel"
            action={() => updateMode("readOnly")}
            hidden={isReadOnlyMode(mode)}
          />,
          <Button
            key="submit"
            type="primary"
            name="Submit"
            action={submitForm}
            hidden={isReadOnlyMode(mode)}
          />
        ]}
      />
      <Field
        placeHolderText="First Name"
        pathToState="firstName"
        value={localState.firstName}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
      />
      <Field
        placeHolderText="Last Name"
        pathToState="lastName"
        value={localState.lastName}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
      />
      <Field
        placeHolderText="Phone Number"
        pathToState="phone"
        value={localState.phone}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
      />
      <Selector
        title="Type"
        options={userRoleOptionsWithStringValues}
        pathToState="type"
        value={localState.type}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
      />
      <MultiSelect
        title="Type"
        options={userRoleOptions}
        pathToState="roles"
        values={localState.roles as string[]}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
      />

      <Row justify="space-between" align="middle">
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
        />
      </Row>

      <Table<Program>
        data={associatedPrograms}
        columns={columns}
        actions={actions}
      ></Table>
    </Container>
  );
};

export default User;
