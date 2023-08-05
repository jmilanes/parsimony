import React, { useState } from "react";

import {
  BehaviorType,
  Domains,
  Program,
  ProgramsPageMetaTestIds,
  ProgramTypes,
  User
} from "@parsimony/types";

import {
  behaviorTypes,
  initialBehaviorData,
  initialProgramData,
  programTypes
} from "../../fixtures";
import { Field, Selector } from "../../components";
import { AddForm } from "../addForm.container";

import { Container } from "typedi";
import { getFullName, removeMongoIds } from "../../utils";
import UIApi from "../../domains/uiApi/uiApi.Service";

export type IBehaviorAddFormProps = React.PropsWithChildren<{
  show: boolean;
  setShowCb: (payload: boolean) => void;
  collectionId: string;
}>;

export const BehaviorAddForm = ({
  show,
  setShowCb,
  collectionId
}: IBehaviorAddFormProps) => {
  const API = Container.get(UIApi);
  const stateManager = API.system.StateService;
  const [localState, updateLocalState] = useState<Program>(initialBehaviorData);

  const clients = API.system.getItemsFromStore(Domains.User);

  const clientDataOptions = clients.map((client: User) => ({
    name: getFullName(client),
    value: client?.id
  }));

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitAddForm = async () => {
    await API.system.makeRequest({
      domain: Domains.Program,
      requestType: "create",
      payload: removeMongoIds({
        ...localState,
        collectionId: collectionId,
        behavior: {
          ...localState.behavior,
          //TODO Fix
          alertTime: parseInt(
            localState?.behavior?.alertTime as unknown as string
          )
        }
      })
    });
    setShowCb(false);
    updateLocalState(initialBehaviorData);
  };

  return (
    <AddForm
      showForm={show}
      onCreate={submitAddForm}
      onCancel={() => {
        setShowCb(false);
        updateLocalState(initialProgramData);
      }}
      title="Add Program"
    >
      <Field
        placeHolderText="Title"
        pathToState="title"
        value={localState.title}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <Field
        placeHolderText="Description"
        pathToState="description"
        value={localState.description}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.descriptionField}
      />
      <Selector
        title="Type"
        pathToState="type"
        value={localState.type}
        options={programTypes}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.typeSelector}
      />
      <Selector
        title="Behavior Type"
        pathToState="behavior.type"
        value={localState.behavior?.type}
        options={behaviorTypes}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.typeSelector}
      />

      {localState.behavior?.type === BehaviorType.Interval && (
        <Field
          placeHolderText="Alert Time"
          pathToState="behavior.alertTime"
          //TODO Figure this out
          value={localState.behavior?.alertTime?.toString()}
          updateState={updateState}
          metaTestId={ProgramsPageMetaTestIds.descriptionField}
        />
      )}
      {localState.type === ProgramTypes.Client && (
        <Selector
          title="Client"
          pathToState="clientId"
          value={localState.clientId}
          options={clientDataOptions}
          updateState={updateState}
          metaTestId={ProgramsPageMetaTestIds.clientSelector}
        />
      )}
    </AddForm>
  );
};
