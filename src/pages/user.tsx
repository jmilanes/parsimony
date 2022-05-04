import React from "react";
import { userRoleOptions, userRoleOptionsWithStringValues } from "../fixtures";

import {
  Header,
  Container,
  Field,
  Selector,
  MultiSelect,
  Button,
  Table
} from "../components";
import {
  StateManger,
  userData,
  programData
} from "../services/dataAccessServices";
import { IModes, IProgram, IUser } from "../types";

import {
  getFullName,
  getRouterParams,
  isEditMode,
  isReadOnlyMode
} from "../utils";
import { navigateToRoute } from "../utils";
import { filterService } from "../services/dataAccessServices";
import { Routes } from "../enums";
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
        pathToState="contactInformation.firstName"
        value={localState.contactInformation?.firstName}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
      />
      <Field
        placeHolderText="Last Name"
        pathToState="contactInformation.lastName"
        value={localState.contactInformation?.lastName}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
      />
      <Field
        placeHolderText="Phone Number"
        pathToState="contactInformation.phone"
        value={localState.contactInformation?.phone}
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

      <Button
        name="Add Programs"
        action={() => {
          filterService.setFromLink();
          filterService.addFilter("main", (data: any) => data.type === "MAIN");
          navigate(`${Routes.Programs}?userId=${user.id}`);
        }}
      />
      <Table<IProgram>
        data={associatedPrograms}
        columns={columns}
        actions={actions}
      ></Table>
    </Container>
  );
};

export default User;
