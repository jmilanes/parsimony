import React, { useMemo } from "react";
import { ProgramPageBehaviorView, ProgramPageProgramView } from "../containers";
import { Button, Container, Header } from "../components";
import {
  Domains,
  IModes,
  Program,
  ProgramPageMetaTestIds,
  ProgramTypes,
  Routes
} from "@parsimony/types/dist";

import {
  getFullName,
  getRouterParams,
  getSearchParams,
  isEditMode,
  isReadOnlyMode,
  navigateToRoute,
  omitMongoKeys
} from "../../utils";

import { Container as DI } from "typedi";
import { useAsync } from "react-use";
import { Spin } from "antd";
import UIApi from "../../domains/accessApis/uiApi/uiApi.Service";

const Program = () => {
  //TODO fix the container collision
  const API = DI.get(UIApi);

  const navigate = navigateToRoute();
  const { programId } = getRouterParams();
  let [searchParams] = getSearchParams();

  const [mode, updateMode] = React.useState<IModes>(
    (searchParams.get("mode") as IModes) || "readOnly"
  );

  const { loading } = useAsync(async () => {
    await API.system.makeRequest({
      domain: Domains.Program,
      requestType: "get",
      payload: { id: programId }
    });
  });

  const form = useMemo(() => {
    if (!loading) {
      const program = API.system.getItem(Domains.Program, programId);
      return API.system.Form.create<Program>(program);
    }
  }, [loading]);

  if (!form) return <Spin />;

  const program = API.system.getItem(Domains.Program, programId);
  const client =
    program?.clientId && API.system.getItem(Domains.User, program?.clientId);

  const submitForm = async () => {
    const payload = omitMongoKeys(form.Data);

    await API.system.makeRequest({
      domain: Domains.Program,
      requestType: "update",
      payload
    });
    updateMode("readOnly");
  };

  const deleteProgram = async () => {
    await API.system.makeRequest({
      domain: Domains.Program,
      requestType: "delete",
      payload: { id: program.id }
    });
    navigate(`/programs`);
  };

  return (
    <Container>
      <Header
        text={program.title || ""}
        size="page"
        extra={[
          <Button
            key="edit"
            name="Edit"
            action={() => {
              updateMode("edit");
              form.reset();
            }}
            hidden={isEditMode(mode)}
            metaTestId={ProgramPageMetaTestIds.editBtn}
          />,
          <Button
            key="cancel"
            name="Cancel"
            action={() => {
              updateMode("readOnly");
              form.reset();
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
            action={() => navigate(`/results/${program.id}`)}
            hidden={isEditMode(mode) || program.type !== ProgramTypes.Client}
            metaTestId={
              ProgramPageMetaTestIds.clientProgramActionViewProgramData
            }
          />
        ]}
      />

      {client && <Header text={`Client: ${getFullName(client)}`} size="sm" />}
      {program.behavior?.type ? (
        <ProgramPageBehaviorView form={form} mode={mode} />
      ) : (
        <ProgramPageProgramView form={form} mode={mode} />
      )}
    </Container>
  );
};

export default Program;
