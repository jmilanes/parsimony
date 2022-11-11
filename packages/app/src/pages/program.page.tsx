import React, { useEffect } from "react";
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
import { Program, IModes, User, Collections } from "@parsimony/types";

import {
  getFullName,
  getRouterParams,
  getSearchParams,
  isEditMode,
  isReadOnlyMode,
  navigateToRoute,
  omitMongoKeys
} from "../utils";
import { ProgramTypes, Routes } from "@parsimony/types";

import { useServices } from "../context";

const Program = () => {
  const { stateManager, dataAccess, store } = useServices();
  const navigate = navigateToRoute();
  const { programId } = getRouterParams();
  let [searchParams] = getSearchParams();

  const program = store.getCollectionItem(Collections.Program, programId || "");

  const [localState, updateLocalState] = React.useState<Program>(program);
  const [mode, updateMode] = React.useState<IModes>(
    (searchParams.get("mode") as IModes) || "readOnly"
  );

  useEffect(() => {
    //TODO Eventually get all by
    if (!program) dataAccess.program.get(programId);
    if (!localState) updateLocalState(program);
    dataAccess.user.getAll();
  }, [program]);

  const client = store.getCollectionItem(Collections.User, program?.clientId);

  //TODO: Filter so only clients are this way
  const allClientOptions = store
    .getCurrentCollectionItems<User>(Collections.User)
    .map((user: User) => ({
      name: getFullName(user),
      value: user.id
    }));

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitForm = () => {
    dataAccess.program.update(omitMongoKeys(localState));
    updateMode("readOnly");
  };

  if (!program || !localState) return null;
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
            action={submitForm}
            hidden={isReadOnlyMode(mode)}
          />
        ]}
      />

      {program.type === ProgramTypes.Client && client && (
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
      {mode === "edit" && (
        <Selector
          title="Client"
          pathToState="clientId"
          value={localState.clientId}
          options={allClientOptions}
          updateState={updateState}
        />
      )}
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
        values={localState.readAccess as string[]}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
      />
      <MultiSelect
        title="Write Access"
        pathToState="writeAccess"
        options={userRoleOptions}
        values={localState.writeAccess as string[]}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
      />

      {program.type === ProgramTypes.Client && client && (
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
