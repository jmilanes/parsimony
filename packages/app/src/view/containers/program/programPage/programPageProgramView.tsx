import React from "react";

import {
  IModes,
  ProgramCategories,
  ProgramPageMetaTestIds,
  ProgramTypes,
  ProgramViewTypes,
  TrialChainingDirections,
  TaskAnalysis,
  DiscreteTrial
} from "@parsimony/types";
import { Checkbox, Field, RichText, Selector } from "../../../components";
import { isReadOnlyMode } from "../../../../utils";
import {
  chainingTypesOptions,
  programCategories,
  programTypes,
  trialViewTypeOptions,
  trialOptions
} from "../../../../fixtures";
import { TargetOptionSelector } from "../../observation/targetOptionsSelector.container";
import { TargetForm } from "../../observation/targetForm.container";
import { InputForm } from "../../../../domains/forms/form";

export const ProgramPageProgramView = ({
  form,
  mode
}: {
  form: InputForm<TaskAnalysis | DiscreteTrial>;
  mode: IModes;
}) => {
  return (
    <>
      <div>
        <h4>Mastery Criteria:</h4>
        <p>
          Student will complete this program with{" "}
          {form.Data.addProgramFormMasteryTarget}% independence across{" "}
          {form.Data.masteryConsecutiveTargets} consecutive session.{" "}
        </p>
        <hr />
      </div>
      <div className="flex-row">
        <Checkbox
          title="Mastered"
          value={!!form.Data.mastered}
          onChange={(value) => form.updateData({ mastered: value })}
          readOnly={isReadOnlyMode(mode)}
          metaTestId={ProgramPageMetaTestIds.masteredCheckbox}
        />
        <Checkbox
          title="Active"
          value={!!form.Data.active}
          onChange={(value) => form.updateData({ active: value }, true)}
          readOnly={isReadOnlyMode(mode)}
          metaTestId={ProgramPageMetaTestIds.behaviorActiveCheckBok}
        />
      </div>

      <Field
        placeHolderText="Title"
        value={form.Data.title}
        onChange={(value) => form.updateData({ title: value })}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.titleField}
      />
      <Selector
        title="View Type"
        value={form.Data.targetStyle}
        options={trialViewTypeOptions}
        onChange={(value) =>
          form.updateData({ viewType: value as ProgramViewTypes })
        }
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.targetStyleSelector}
      />
      <RichText
        content={form.Data.description}
        placeHolderText="Description"
        onChange={(value) => form.updateData({ description: value })}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.descriptionField}
      />
      <RichText
        placeHolderText="Materials"
        content={form.Data.materials}
        onChange={(value) => form.updateData({ materials: value })}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.materialsField}
      />
      {isReadOnlyMode(mode) && (
        <Selector
          title="Type"
          value={form.Data.type}
          options={programTypes}
          onChange={(value) => form.updateData({ type: value as ProgramTypes })}
          readOnly={isReadOnlyMode(mode)}
          metaTestId={ProgramPageMetaTestIds.typeSelector}
        />
      )}
      <Selector
        title="Category"
        value={form.Data.category}
        options={programCategories}
        onChange={(value) =>
          form.updateData({ category: value as ProgramCategories })
        }
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.categorySelector}
      />
      {/*{TODO: SELECTORS SHOULD HAVE GENERICS }*/}
      <Selector
        title="Trials"
        value={form.Data.trials}
        options={trialOptions}
        onChange={(value) => form.updateData({ trials: value as number })}
        isNumber={true}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.stepsSelector}
      />

      <Field
        placeHolderText="Mastery Independence Target (%)"
        value={
          form.Data.masteryTarget ? form.Data.masteryTarget?.toString() : ""
        }
        onChange={(value) =>
          form.updateData({ masteryTarget: parseInt(value) })
        }
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.masterTargetField}
      />
      <Field
        placeHolderText="Mastery Consecutive Requriement"
        value={
          form.Data.masteryConsecutiveTargets
            ? form.Data.masteryConsecutiveTargets?.toString()
            : ""
        }
        onChange={(value) =>
          form.updateData({ masteryConsecutiveTargets: parseInt(value) })
        }
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.masteryConsecutiveTargetField}
      />

      {form.Data.targetStyle === ProgramViewTypes.TaskAnalysis && (
        <Selector
          title="Chaining Style"
          value={form.Data.chaining?.type}
          options={chainingTypesOptions}
          onChange={(value) =>
            form.updateData(
              { chaining: { type: value as TrialChainingDirections } },
              true
            )
          }
          readOnly={isReadOnlyMode(mode)}
          metaTestId={ProgramPageMetaTestIds.chainingDirections}
        />
      )}
      <TargetOptionSelector form={form} readOnly={isReadOnlyMode(mode)} />
      <TargetForm form={form} readOnly={isReadOnlyMode(mode)} />
    </>
  );
};
