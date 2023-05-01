import React, { useEffect } from "react";
import {
  programCategories,
  programTypes,
  targetStyles,
  trialOptions,
  userRoleOptions
} from "../fixtures";
import { TargetForm } from "../containers";
import {
  Button,
  Container,
  Field,
  Header,
  MultiSelect,
  Row,
  Selector
} from "../components";
import {
  Domains,
  IModes,
  Program,
  ProgramPageMetaTestIds,
  ProgramTypes,
  Routes,
  TargetOption,
  User
} from "@parsimony/types";

import {
  clone,
  getFullName,
  getRouterParams,
  getSearchParams,
  isEditMode,
  isReadOnlyMode,
  navigateToRoute,
  omitMongoKeys
} from "../utils";

import { useServices } from "../context";
import { TargetOptionSelector } from "../containers/targetOptionsSelector.container";
import { CommandService } from "../domains/commands/command.service";
import { Container as DI } from "typedi";

const Program = () => {
  //TODO fix the container collision
  const CS = DI.get(CommandService);
  const { stateManager } = useServices();
  const navigate = navigateToRoute();
  const { programId } = getRouterParams();
  let [searchParams] = getSearchParams();

  const program = CS.api.getItem<Program>({
    domain: Domains.Program,
    id: programId || ""
  });

  const [localState, updateLocalState] = React.useState<Program>(program);
  const [mode, updateMode] = React.useState<IModes>(
    (searchParams.get("mode") as IModes) || "readOnly"
  );

  useEffect(() => {
    //TODO Eventually get all by
    if (!program) {
      CS.api.makeRequest({
        domain: Domains.Program,
        payload: programId || "",
        requestType: "get"
      });
    }
    if (!localState) updateLocalState(clone(program) as Program);
    CS.api.makeRequest({
      domain: Domains.User,
      requestType: "getAll"
    });
  }, [program]);

  const client = CS.api.getItem<User>({
    domain: Domains.User,
    id: program?.clientId || ""
  });

  //TODO: Filter so only clients are this way
  const allClientOptions = CS.api
    .getItems<User[]>({
      domain: Domains.User
    })
    .map((user: User) => ({
      name: getFullName(user),
      value: user.id
    }));

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitForm = () => {
    console.log(localState);
    CS.api.makeRequest({
      domain: Domains.Program,
      requestType: "update",
      payload: omitMongoKeys(localState)
    });
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
            metaTestId={ProgramPageMetaTestIds.editBtn}
          />,
          <Button
            key="cancel"
            name="Cancel"
            action={() => {
              updateMode("readOnly");
              updateLocalState(program);
            }}
            hidden={isReadOnlyMode(mode)}
            metaTestId={ProgramPageMetaTestIds.cancelEditBtn}
          />,
          <Button
            key="save"
            name="Save"
            action={submitForm}
            hidden={isReadOnlyMode(mode)}
            metaTestId={ProgramPageMetaTestIds.submitEditBtn}
          />,
          <Button
            key="delete"
            name="Delete"
            action={() => {
              CS.api.makeRequest({
                domain: Domains.Program,
                requestType: "delete",
                payload: { id: program.id }
              });
              navigate(`/programs`);
            }}
            hidden={isEditMode(mode)}
            metaTestId={ProgramPageMetaTestIds.deleteProgramBtn}
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
        metaTestId={ProgramPageMetaTestIds.titleField}
      />
      <Field
        placeHolderText="Description"
        pathToState="description"
        value={localState.description}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.descriptionField}
      />
      <Field
        placeHolderText="Materials"
        pathToState="materials"
        value={localState.materials}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.materialsField}
      />
      <Selector
        title="Type"
        pathToState="type"
        value={localState.type}
        options={programTypes}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.typeSelector}
      />
      <Selector
        title="Category"
        pathToState="category"
        value={localState.category}
        options={programCategories}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.categorySelector}
      />

      {/* This prob shouldn't exist but might need for now  */}
      {mode === "edit" && (
        <Selector
          title="Client"
          pathToState="clientId"
          value={localState.clientId}
          options={allClientOptions}
          updateState={updateState}
          metaTestId={ProgramPageMetaTestIds.clientSelector}
        />
      )}

      <Selector
        title="Trials"
        pathToState="trials"
        value={localState.trials}
        options={trialOptions}
        updateState={updateState}
        isNumber={true}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.stepsSelector}
      />

      <Selector
        title="Target Style"
        pathToState="targetStyle"
        value={localState.targetStyle}
        options={targetStyles}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.ruleStyleSelector}
      />
      <MultiSelect
        title="Read Access"
        pathToState="readAccess"
        options={userRoleOptions}
        values={localState.readAccess as string[]}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.readAccessMultiSelector}
      />
      <MultiSelect
        title="Write Access"
        pathToState="writeAccess"
        options={userRoleOptions}
        values={localState.writeAccess as string[]}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.writeAccessMultiSelector}
      />

      {program.type === ProgramTypes.Client && client && (
        <Row>
          <Button
            name="View Client"
            action={() => navigate(`${Routes.Users}/${program.clientId}`)}
            hidden={isEditMode(mode)}
            metaTestId={ProgramPageMetaTestIds.clientProgramActionViewClient}
          />
          <Button
            name="Start Observation"
            action={() => navigate(`${Routes.Programs}/${program.id}/observe`)}
            hidden={isEditMode(mode)}
            metaTestId={
              ProgramPageMetaTestIds.clientProgramActionStartObservation
            }
          />
          <Button
            name="View Data"
            action={() => navigate(`/results/${program.clientId}`)}
            hidden={isEditMode(mode)}
            metaTestId={
              ProgramPageMetaTestIds.clientProgramActionViewProgramData
            }
          />
        </Row>
      )}

      {Array.isArray(localState.targetOptions) && (
        <TargetOptionSelector
          targetOptions={localState.targetOptions as TargetOption[]}
          updateState={updateState}
          readOnly={isReadOnlyMode(mode)}
        />
      )}

      {Array.isArray(localState.targets) && (
        <TargetForm
          localState={localState}
          updateState={updateState}
          readOnly={isReadOnlyMode(mode)}
        />
      )}
    </Container>
  );
};

export default Program;
