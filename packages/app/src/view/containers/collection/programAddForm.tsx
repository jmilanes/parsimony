import React, { useEffect } from "react";

import {
  Domains,
  Program,
  ProgramsPageMetaTestIds,
  TargetOption,
  TargetStyle
} from "@parsimony/types/dist";

import {
  chainingTypesOptions,
  initialProgramData,
  programCategories,
  programTypes,
  targetStyles,
  trialOptions
} from "../../../fixtures";
import { Field, RichText, Selector } from "../../components";
import { TargetOptionSelector } from "../targetOptionsSelector.container";
import { TargetForm } from "../targetForm.container";
import { AddForm } from "../addForm.container";

import { Container } from "typedi";
import { removeMongoIds } from "../../../utils";
import UIApi from "../../../domains/accessApis/uiApi/uiApi.Service";

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

  useEffect(() => {
    if (localState.targetStyle === TargetStyle.DiscreteTrials) {
      const copy = { ...localState };
      delete copy.chaining;
      updateLocalState(copy);
    } else {
      const copy = { ...localState };
      copy.chaining = initialProgramData.chaining;
      updateLocalState(copy);
    }
  }, [localState.targetStyle]);

  const updateState = stateManager.updateLocalState({
    localState,
    updateLocalState
  });

  const submitAddForm = async () => {
    const payload = API.utils.transform.parseIntByPath(localState, [
      "masteryConsecutiveTargets",
      "masteryTarget"
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
      <RichText
        placeHolderText="Description"
        pathToState="description"
        content={localState.description}
        updateState={updateState}
        metaTestId={ProgramsPageMetaTestIds.descriptionField}
      />
      <RichText
        placeHolderText="Materials"
        pathToState="materials"
        content={localState.materials}
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
      <Field
        placeHolderText="Mastery Independence Target (%)"
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
      <div className="add-form-spacer">
        <TargetOptionSelector
          targetOptions={localState.targetOptions as TargetOption[]}
          updateState={updateState}
        />
      </div>
      <div className="add-form-spacer">
        <TargetForm localState={localState} updateState={updateState} />
      </div>
    </AddForm>
  );
};
