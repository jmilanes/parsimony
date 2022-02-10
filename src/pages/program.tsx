import React from "react";
import { programTypes } from "../fixtures";
import ComponentsService from "../services/componentsService";
import { programData, StateManger } from "../services/dataAccessServices";
import { IProgram } from "../types";

import { getRouterParams } from "../utils";
import { IModes } from "./user";

const Program = () => {
  const { programId } = getRouterParams();
  const program = programData.get(programId || "");
  const [localState, updateLocalState] = React.useState<IProgram>(program);
  const [mode, updateMode] = React.useState<IModes>("readOnly");
  const updateState = StateManger.updateLocalState({
    localState,
    updateLocalState
  });

  const readOnlyMode = mode === "readOnly";
  const editMode = mode === "edit";

  const submitForm = () => {
    programData.update(localState);
    updateMode("readOnly");
  };

  return (
    <ComponentsService.Container>
      <h1>Program {program.title}</h1>
      {ComponentsService.Selector({
        title: "type",
        options: programTypes,
        pathToState: "type",
        value: localState.type,
        updateState,
        readOnly: readOnlyMode
      })}
      {ComponentsService.Field({
        pathToState: "title",
        value: localState.title,
        updateState,
        readOnly: readOnlyMode
      })}
      {ComponentsService.Button({
        name: "Edit",
        action: () => updateMode("edit"),
        hidden: editMode
      })}
      {ComponentsService.Button({
        name: "Cancel",
        action: () => updateMode("readOnly"),
        hidden: readOnlyMode
      })}
      {ComponentsService.Button({
        name: "Submit",
        action: submitForm,
        hidden: readOnlyMode
      })}
    </ComponentsService.Container>
  );
};

export default Program;
