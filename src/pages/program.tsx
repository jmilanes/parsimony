import React from "react";
import { programTypes, userRoleOptions } from "../fixtures";
import { RulesForm } from "../containers";
import {
  Container,
  Header,
  Field,
  Button,
  Selector,
  MultiSelect
} from "../components";
import { programData, StateManger } from "../services/dataAccessServices";
import { IProgram, IModes } from "../types";

import { getRouterParams, isEditMode, isReadOnlyMode } from "../utils";

const Program = () => {
  const { programId } = getRouterParams();
  const program = programData.get(programId || "");
  const [localState, updateLocalState] = React.useState<IProgram>(program);
  const [mode, updateMode] = React.useState<IModes>("readOnly");

  const updateState = StateManger.updateLocalState({
    localState,
    updateLocalState
  });

  const submitForm = () => {
    programData.update(localState);
    updateMode("readOnly");
  };

  return (
    <Container>
      <Header text={`Program ${program.title}`} size="lg" />
      <Field
        placeHolderText="Title"
        pathToState="title"
        value={localState.title}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
      />
      <Field
        placeHolderText="Description"
        pathToState="description"
        value={localState.description}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
      />
      <Selector
        title="Type"
        pathToState="type"
        value={localState.type}
        options={programTypes}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
      />
      <MultiSelect
        title="Read Access"
        pathToState="readAccess"
        options={userRoleOptions}
        values={localState.readAccess}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
      />
      <MultiSelect
        title="Write Access"
        pathToState="writeAccess"
        options={userRoleOptions}
        values={localState.writeAccess}
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

      <RulesForm
        localState={localState}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
      />
    </Container>
  );
};

export default Program;
