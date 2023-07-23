import React from "react";
import {
  programCategories,
  programTypes,
  targetStyles,
  trialOptions,
  userRoleOptions
} from "../fixtures";
import { ProgramPageBehaviorView, ProgramPageProgramView } from "../containers";
import { Button, Container, Header } from "../components";
import {
  Domains,
  IModes,
  Program,
  ProgramPageMetaTestIds,
  ProgramTypes,
  Routes
} from "@parsimony/types";

import {
  getFullName,
  getRouterParams,
  getSearchParams,
  isEditMode,
  isReadOnlyMode,
  navigateToRoute,
  omitMongoKeys
} from "../utils";

import { Container as DI } from "typedi";
import { useAsync } from "react-use";
import { Spin } from "antd";
import UIApi from "../domains/uiApi/uiApi.Service";

const Program = () => {
  //TODO fix the container collision
  const API = DI.get(UIApi);

  const stateManager = API.StateService;
  const navigate = navigateToRoute();
  const { programId } = getRouterParams();
  let [searchParams] = getSearchParams();
  const [mode, updateMode] = React.useState<IModes>(
    (searchParams.get("mode") as IModes) || "readOnly"
  );
  const [localState, updateLocalState] = React.useState<Program>();

  const { loading } = useAsync(async () => {
    await API.makeRequest({
      domain: Domains.Program,
      requestType: "get",
      payload: { id: programId }
    });

    if (programId) {
      const program = API.getItem(Domains.Program, programId);
      updateLocalState(program);
    }
  });

  if (loading || !localState || !programId) return <Spin />;

  const program = API.getItem(Domains.Program, programId);
  const client =
    program?.clientId && API.getItem(Domains.User, program?.clientId);

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitForm = async () => {
    await API.makeRequest({
      domain: Domains.Program,
      requestType: "update",
      payload: omitMongoKeys(localState)
    });
    updateMode("readOnly");
  };

  const deleteProgram = async () => {
    await API.makeRequest({
      domain: Domains.Program,
      requestType: "delete",
      payload: { id: program.id }
    });
    navigate(`/programs`);
  };

  if (!program || !localState) return null;
  const header = program.behavior ? "Behavior" : Program;
  console.log(program);
  const View = () =>
    program.behavior ? (
      <ProgramPageBehaviorView
        localState={localState}
        updateState={updateState}
        mode={mode}
      />
    ) : (
      <ProgramPageProgramView
        localState={localState}
        updateState={updateState}
        mode={mode}
      />
    );
  return (
    <Container>
      <Header
        text={`${header} ${program.title}`}
        size="page"
        extra={[
          <Button
            key="edit"
            name="Edit"
            action={() => {
              updateMode("edit");
              updateLocalState(program);
            }}
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
            action={deleteProgram}
            hidden={isEditMode(mode)}
            metaTestId={ProgramPageMetaTestIds.deleteProgramBtn}
          />,

          <Button
            name="View Client"
            action={() => navigate(`/${Routes.Users}/${program.clientId}`)}
            hidden={isEditMode(mode) || program.type !== ProgramTypes.Client}
            metaTestId={ProgramPageMetaTestIds.clientProgramActionViewClient}
          />,
          <Button
            name="Start Observation"
            action={() => navigate(`/programs/${program.id}/observe`)}
            hidden={isEditMode(mode) || program.type !== ProgramTypes.Client}
            metaTestId={
              ProgramPageMetaTestIds.clientProgramActionStartObservation
            }
          />,
          <Button
            name="View Data"
            action={() => navigate(`/results/${program.clientId}`)}
            hidden={isEditMode(mode) || program.type !== ProgramTypes.Client}
            metaTestId={
              ProgramPageMetaTestIds.clientProgramActionViewProgramData
            }
          />
        ]}
      />

      {client && <Header text={`Client: ${getFullName(client)}`} size="sm" />}
      <View />
    </Container>
  );
};

export default Program;
