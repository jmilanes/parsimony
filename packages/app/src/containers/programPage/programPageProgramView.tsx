import React from "react";

import {
  Domains,
  IModes,
  Program,
  ProgramPageMetaTestIds,
  ProgramsPageMetaTestIds,
  TargetOption,
  TargetStyle,
  User
} from "@parsimony/types";
import { Checkbox, Field, RichText, Selector } from "../../components";
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
      <div>
        <h4>Mastery Criteria:</h4>
        <p>
          Student will complete this program with {localState.masteryTarget}%
          independence across {localState.masteryConsecutiveTargets} consecutive
          session.{" "}
        </p>
        <hr />
      </div>
      <Checkbox
        title="Mastered"
        pathToState={"mastered"}
        value={!!localState.mastered}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.masteredCheckbox}
      />
      <Field
        placeHolderText="Title"
        pathToState="title"
        value={localState.title}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Description"
        pathToState="description"
        content={localState.description}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.descriptionField}
      />
      <RichText
        placeHolderText="Materials"
        pathToState="materials"
        content={localState.materials}
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
      <Field
        placeHolderText="Mastery Independence Target (%)"
        pathToState="masteryTarget"
        value={localState.masteryTarget?.toString()}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramsPageMetaTestIds.masteryTarget}
      />
      <Field
        placeHolderText="Mastery Consecutive Requriement"
        pathToState="masteryConsecutiveTargets"
        value={localState.masteryConsecutiveTargets?.toString()}
        updateState={updateState}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramsPageMetaTestIds.masteryConsecutive}
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
