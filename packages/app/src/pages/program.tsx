import React from "react";
import { programTypes, ruleStyles, userRoleOptions } from "../fixtures";
import { RulesForm } from "../containers";
import {
  Container,
  Header,
  Field,
  Button,
  Selector,
  MultiSelect,
  Row
} from "../components";
import { programData, userData } from "../services/dataAccessServices";
import { Program, IModes } from "@parsimony/types";

import {
  getFullName,
  getRouterParams,
  getSearchParams,
  isEditMode,
  isReadOnlyMode,
  navigateToRoute
} from "../utils";
import { ProgramTypes, Routes } from "@parsimony/types";
import { StateManger } from "../services/crudServices";

const Program = () => {
  const navigate = navigateToRoute();
  const { programId } = getRouterParams();
  let [searchParams] = getSearchParams();

  const program = programData.get(programId || "");
  const client = userData.get(program.clientId || "");

  const [localState, updateLocalState] = React.useState<Program>(program);
  const [mode, updateMode] = React.useState<IModes>(
    (searchParams.get("mode") as IModes) || "readOnly"
  );

  const updateState = StateManger.updateLocalState({
    localState,
    updateLocalState
  });

  const submitForm = () => {
    // TODO Fix Edit
    programData.update(localState);
    updateMode("readOnly");
  };

  return (
    <Container>
      <Header
        text={`Program ${program.title}`}
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
            name="Submit"
            type="primary"
            action={submitForm}
            hidden={isReadOnlyMode(mode)}
          />
        ]}
      />

      {program.type === ProgramTypes.Client && (
        <Header text={`Client: ${getFullName(client)}`} size="sm" />
      )}
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
      <Selector
        title="Rule Style"
        pathToState="ruleStyle"
        value={localState.ruleStyle}
        options={ruleStyles}
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

      {program.type === ProgramTypes.Client && (
        <Row>
          <Button
            name="View Client"
            action={() => navigate(`${Routes.Users}/${program.clientId}`)}
            hidden={isEditMode(mode)}
          />
          <Button
            name="Start Observation"
            action={() => navigate(`${Routes.Programs}/${program.id}/observe`)}
            hidden={isEditMode(mode)}
          />
          <Button
            name="View Data"
            action={() => navigate(`/results/${program.clientId}`)}
            hidden={isEditMode(mode)}
          />
        </Row>
      )}

      {Array.isArray(localState.rules) && (
        <RulesForm
          localState={localState}
          updateState={updateState}
          readOnly={isReadOnlyMode(mode)}
        />
      )}
    </Container>
  );
};

export default Program;
