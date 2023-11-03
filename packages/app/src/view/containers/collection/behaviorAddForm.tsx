import React, { useState } from "react";

import {
  BehaviorType,
  Domains,
  Program,
  ProgramsPageMetaTestIds,
  ProgramTypes,
  User
} from "@parsimony/types/dist";

import {
  behaviorTypes,
  initialBehaviorData,
  initialProgramData,
  programTypes
} from "../../../fixtures";
import { Field, RichText, Selector } from "../../components";
import { AddForm } from "../shared/addForm.container";

import { Container } from "typedi";
import { getFullName, removeMongoIds } from "../../../utils";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

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
    const payload = API.utils.transform.parseIntByPath(localState, [
      "masteryConsecutiveTargets",
      "masteryTarget",
      "behavior.alertTime"
    ]);

    await API.system.makeRequest({
      domain: Domains.Program,
      requestType: "create",
      payload: removeMongoIds({
        ...payload,
        collectionId
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
      <RichText
        placeHolderText="Description"
        pathToState="description"
        content={localState.description}
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
          placeHolderText="Alert Duration (Seconds)"
          pathToState="behavior.alertTime"
          //TODO Figure this out
          value={localState.behavior?.alertTime?.toString()}
          updateState={updateState}
          metaTestId={ProgramsPageMetaTestIds.descriptionField}
        />
      )}

      <Field
        placeHolderText="Mastery Independence Target"
        pathToState="masteryTarget"
        value={localState.masteryTarget?.toString()}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.masteryTarget}
      />
      <Field
        placeHolderText="Mastery Consecutive Requriement"
        pathToState="masteryConsecutiveTargets"
        value={localState.masteryConsecutiveTargets?.toString()}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.masteryConsecutive}
      />

      <RichText
        placeHolderText="Operational Definition"
        pathToState="behavior.operationalDefinition"
        content={localState.behavior?.operationalDefinition}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Precursor Behaviors"
        pathToState="behavior.precursorBehaviors"
        content={localState.behavior?.precursorBehaviors}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Proactive Strategies"
        pathToState="behavior.proactiveStrategies"
        content={localState.behavior?.proactiveStrategies}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Reactive Strategies"
        pathToState="behavior.reactiveStrategies"
        content={localState.behavior?.reactiveStrategies}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.titleField}
      />
    </AddForm>
  );
};
