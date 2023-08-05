import React from "react";

import {
  Domains,
  IModes,
  Program,
  ProgramPageMetaTestIds,
  ProgramsPageMetaTestIds,
  User
} from "@parsimony/types";
import { Checkbox, Field, Selector } from "../../components";
import { getFullName, isReadOnlyMode } from "../../utils";
import { behaviorTypes } from "../../fixtures";
import { Container as DI } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";

export const ProgramPageBehaviorView = ({
  localState,
  updateState,
  mode
}: {
  localState: Program;
  mode: IModes;
  updateState: any;
}) => {
  const API = DI.get(UIApi);
  const allClients = API.system.getItemsFromStore(Domains.User);

  const options = allClients.map((user: User) => ({
    name: getFullName(user),
    value: user.id
  }));

  const readOnly = isReadOnlyMode(mode);
  return (
    <>
      <Field
        placeHolderText="Title"
        pathToState="title"
        value={localState.title}
        updateState={updateState}
        readOnly={readOnly}
        metaTestId={ProgramPageMetaTestIds.titleField}
      />
      <Field
        placeHolderText="Description"
        pathToState="description"
        value={localState.description}
        updateState={updateState}
        readOnly={readOnly}
        metaTestId={ProgramPageMetaTestIds.descriptionField}
      />
      <Checkbox
        title="Active"
        pathToState={"behavior.active"}
        value={!!localState.behavior?.active}
        updateState={updateState}
        readOnly={readOnly}
        metaTestId={ProgramPageMetaTestIds.behaviorActiveCheckBok}
      />
      <Selector
        title="Behavior Type"
        pathToState="behavior.type"
        value={localState.behavior?.type}
        options={behaviorTypes}
        updateState={updateState}
        readOnly={readOnly}
        metaTestId={ProgramsPageMetaTestIds.typeSelector}
      />

      <Field
        placeHolderText="Alert Time"
        pathToState="behavior.alertTime"
        //TODO Figure this out
        value={localState.behavior?.alertTime?.toString()}
        updateState={updateState}
        readOnly={readOnly}
        metaTestId={ProgramsPageMetaTestIds.descriptionField}
      />
      {/* This prob shouldn't exist but might need for now  */}
      {mode === "edit" && (
        <Selector
          title="Client"
          pathToState="clientId"
          value={localState.clientId}
          options={options}
          updateState={updateState}
          metaTestId={ProgramPageMetaTestIds.clientSelector}
        />
      )}
    </>
  );
};
