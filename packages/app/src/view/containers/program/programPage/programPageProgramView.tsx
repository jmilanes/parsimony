import React from "react";

import {
  IModes,
  Program,
  ProgramCategories,
  ProgramPageMetaTestIds,
  ProgramsPageMetaTestIds,
  ProgramTypes,
  TargetOption,
  TargetStyle,
  TrialChainingDirections
} from "@parsimony/types";
import { Checkbox, Field, RichText, Selector } from "../../../components";
import { isReadOnlyMode } from "../../../../utils";
import {
  chainingTypesOptions,
  programCategories,
  programTypes,
  targetStyles,
  trialOptions
} from "../../../../fixtures";
import { TargetOptionSelector } from "../../observation/targetOptionsSelector.container";
import { TargetForm } from "../../observation/targetForm.container";
import { InputForm } from "../../../../domains/forms/form";

export const ProgramPageProgramView = ({
  form,
  mode
}: {
  form: InputForm<Program>;
  mode: IModes;
}) => {
  return (
    <>
      <div>
        <h4>Mastery Criteria:</h4>
        <p>
          Student will complete this program with {form.Data.masteryTarget}%
          independence across {form.Data.masteryConsecutiveTargets} consecutive
          session.{" "}
        </p>
        <hr />
      </div>
      <Checkbox
        title="Mastered"
        value={!!form.Data.mastered}
        onChange={(value) => form.updateData({ mastered: value })}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.masteredCheckbox}
      />
      <Field
        placeHolderText="Title"
        value={form.Data.title}
        onChange={(value) => form.updateData({ title: value })}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.titleField}
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
      <Selector
        title="Type"
        value={form.Data.type}
        options={programTypes}
        onChange={(value) => form.updateData({ type: value as ProgramTypes })}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.typeSelector}
      />
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
      <Selector
        title="Target Style"
        value={form.Data.targetStyle}
        options={targetStyles}
        onChange={(value) =>
          form.updateData({ targetStyle: value as TargetStyle })
        }
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.ruleStyleSelector}
      />
      <Field
        placeHolderText="Mastery Independence Target (%)"
        value={form.Data.masteryTarget?.toString()}
        onChange={(value) =>
          form.updateData({ masteryTarget: parseInt(value) })
        }
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramsPageMetaTestIds.masteryTarget}
      />
      <Field
        placeHolderText="Mastery Consecutive Requriement"
        value={form.Data.masteryConsecutiveTargets?.toString()}
        onChange={(value) =>
          form.updateData({ masteryConsecutiveTargets: parseInt(value) })
        }
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramsPageMetaTestIds.masteryConsecutive}
      />

      {form.Data.targetStyle === TargetStyle.TaskAnalysis && (
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
          metaTestId={ProgramPageMetaTestIds.chaingDirections}
        />
      )}
      <TargetOptionSelector form={form} readOnly={isReadOnlyMode(mode)} />
      <TargetForm form={form} readOnly={isReadOnlyMode(mode)} />
    </>
  );
};
