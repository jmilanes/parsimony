import React from "react";

import ComponentsService from "../services/componentsService";
import { StateManger, userData } from "../services/dataAccessServices";
import { IUser } from "../types";

import { getFullName, getRouterParams } from "../utils";

export type IModes = "readOnly" | "edit";

const User = () => {
  const { userId } = getRouterParams();

  const user = userData.get(userId || "");
  const [localState, updateLocalState] = React.useState<IUser>(user);

  const [mode, updateMode] = React.useState<IModes>("readOnly");
  const updateState = StateManger.updateLocalState({
    localState,
    updateLocalState
  });

  const readOnlyMode = mode === "readOnly";
  const editMode = mode === "edit";

  return (
    <ComponentsService.Container>
      <h1>{getFullName(localState)}</h1>
      {ComponentsService.Field({
        pathToState: "contactInformation.firstName",
        value: localState.contactInformation.firstName,
        updateState,
        readOnly: readOnlyMode
      })}
      {ComponentsService.Field({
        pathToState: "contactInformation.lastName",
        value: localState.contactInformation.lastName,
        updateState,
        readOnly: readOnlyMode
      })}
      {ComponentsService.Field({
        pathToState: "type",
        value: localState.type,
        updateState,
        readOnly: readOnlyMode
      })}
      {ComponentsService.Button({
        name: "Edit",
        action: () => updateMode("edit"),
        hidden: editMode
      })}
      {ComponentsService.Button({
        name: "Cancle",
        action: () => updateMode("readOnly"),
        hidden: readOnlyMode
      })}
      {ComponentsService.Button({
        name: "Submit",
        action: () => updateMode("readOnly"),
        hidden: readOnlyMode
      })}
    </ComponentsService.Container>
  );
};

export default User;
