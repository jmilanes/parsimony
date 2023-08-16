import React from "react";

import {
  Domains,
  IModes,
  Program,
  ProgramPageMetaTestIds,
  TargetOption,
  TargetStyle,
  User
} from "@parsimony/types";
import { Field, Selector } from "../../components";
import { getFullName, isReadOnlyMode } from "../../utils";
import {
  chainingTypesOptions,
  programCategories,
  programTypes,
  targetStyles,
  trialOptions
} from "../../fixtures";
import { TargetOptionSelector } from "../targetOptionsSelector.container";
import { TargetForm } from "../targetForm.container";
import { Container as DI } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";

export const ProgramPageProgramView = ({
  localState,
  updateState,
  mode
}: {
  localState: Program;
  mode: IModes;
  updateState: any;
}) => {
  return (
    <>
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
      {localState.targetStyle === TargetStyle.TaskAnalysis && (
        <Selector
          title="Chaining Style"
          pathToState="chaining.type"
          value={localState.chaining?.type}
          options={chainingTypesOptions}
          updateState={updateState}
          readOnly={isReadOnlyMode(mode)}
          metaTestId={ProgramPageMetaTestIds.chaingDirections}
        />
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
    </>
  );
};
