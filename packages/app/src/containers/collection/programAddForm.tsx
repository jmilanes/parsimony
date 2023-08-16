import React from "react";

import {
  Domains,
  Program,
  ProgramsPageMetaTestIds,
  TargetOption,
  TargetStyle
} from "@parsimony/types";

import {
  chainingTypesOptions,
  initialProgramData,
  programCategories,
  programTypes,
  targetStyles,
  trialOptions
} from "../../fixtures";
import { Field, Selector } from "../../components";
import { TargetOptionSelector } from "../targetOptionsSelector.container";
import { TargetForm } from "../targetForm.container";
import { AddForm } from "../addForm.container";

import { Container } from "typedi";
import { getFullName, removeMongoIds } from "../../utils";
import UIApi from "../../domains/uiApi/uiApi.Service";

export type IProgramAddFormProps = React.PropsWithChildren<{
  show: boolean;
  setShowCb: (payload: boolean) => void;
  collectionId: string;
}>;

export const ProgramAddForm = ({
  show,
  setShowCb,
  collectionId
}: IProgramAddFormProps) => {
  const API = Container.get(UIApi);
  const stateManager = API.system.StateService;
  const [localState, updateLocalState] =
    React.useState<Program>(initialProgramData);

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
        collectionId: collectionId
      })
    });
    setShowCb(false);
    updateLocalState(initialProgramData);
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
      <Field
        placeHolderText="Materials"
        pathToState="materials"
        value={localState.materials}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.materialsField}
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
        title="Trials"
        pathToState="trials"
        value={localState.trials}
        options={trialOptions}
        updateState={updateState}
        isNumber={true}
        metaTestId={ProgramsPageMetaTestIds.stepsSelector}
      />

      <Selector
        title="Target Style"
        pathToState="targetStyle"
        value={localState.targetStyle}
        options={targetStyles}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.ruleStyleSelector}
      />
      {localState.targetStyle === TargetStyle.TaskAnalysis && (
        <Selector
          title="Chainging"
          pathToState="chaining.type"
          value={localState.chaining?.type}
          options={chainingTypesOptions}
          updateState={updateState}
          metaTestId={ProgramsPageMetaTestIds.chainingSelector}
        />
      )}
      <Selector
        title="Category"
        pathToState="category"
        value={localState.category}
        options={programCategories}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.categorySelector}
      />
      <TargetOptionSelector
        targetOptions={localState.targetOptions as TargetOption[]}
        updateState={updateState}
      />
      <TargetForm localState={localState} updateState={updateState} />
    </AddForm>
  );
};
