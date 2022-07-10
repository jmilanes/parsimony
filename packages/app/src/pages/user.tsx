import React from "react";
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
import {
  StateManger,
  userData,
  programData
} from "../services/dataAccessServices";
import { IModes, IProgram, IUser } from "@parsimony/types";

import {
  getFullName,
  getRouterParams,
  isEditMode,
  isReadOnlyMode
} from "../utils";
import { navigateToRoute } from "../utils";
import { filterService } from "../services/dataAccessServices";
import { Routes } from "@parsimony/types";
import { IColumns, ITableAction } from "../components/table";

const User = () => {
  const { userId } = getRouterParams();
  const navigate = navigateToRoute();

  const user = userData.get(userId || "");
  const associatedPrograms = programData
    .getAll()
    .filter((program) => program.clientId === user.id);
  const [localState, updateLocalState] = React.useState<IUser>(user);

  const [mode, updateMode] = React.useState<IModes>("readOnly");
  const updateState = StateManger.updateLocalState({
    localState,
    updateLocalState
  });

  const submitForm = () => {
    userData.update(localState);
    updateMode("readOnly");
  };

  const columns: IColumns[] = [
    { key: "title", dataIndex: "title", title: "title" },
    { key: "description", dataIndex: "description", title: "description" }
  ];

  const actions: ITableAction[] = [
    {
      name: "Start Observing",
      method: (program: IProgram) => navigate(`/programs/${program.id}/observe`)
    },
    {
      name: "View Data",
      method: (program: IProgram) => navigate(`/results/${program.id}`)
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
        values={localState.roles}
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

      <Table<IProgram>
        data={associatedPrograms}
        columns={columns}
        actions={actions}
      ></Table>
    </Container>
  );
};

export default User;
