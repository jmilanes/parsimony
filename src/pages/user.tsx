import React from "react";
import { userRoleOptions, userRoleOptionsWithStringValues } from "../fixtures";

import {
  Header,
  Container,
  Field,
  Selector,
  MultiSelect,
  Button
} from "../components";
import { StateManger, userData } from "../services/dataAccessServices";
import { IModes, IUser } from "../types";

import {
  getFullName,
  getRouterParams,
  isEditMode,
  isReadOnlyMode
} from "../utils";

const User = () => {
  const { userId } = getRouterParams();

  const user = userData.get(userId || "");
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

  return (
    <Container>
      <Header text={getFullName(localState)} size="lg" />
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
        name="Edit"
        action={() => updateMode("edit")}
        hidden={isEditMode(mode)}
      />
      <Button
        name="Cancel"
        action={() => updateMode("readOnly")}
        hidden={isReadOnlyMode(mode)}
      />
      <Button name="Submit" action={submitForm} hidden={isReadOnlyMode(mode)} />
    </Container>
  );
};

export default User;
