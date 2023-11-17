import React from "react";

import {
  Domains,
  IModes,
  Program,
  ProgramCategories,
  ProgramPageMetaTestIds,
  ProgramsPageMetaTestIds,
  ProgramTypes,
  TargetOption,
  TargetStyle,
  TrialChainingDirections
} from "@parsimony/types/dist";
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
        updateState={(_, value) => form.updateData({ mastered: value })}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.masteredCheckbox}
      />
      <Field
        placeHolderText="Title"
        value={form.Data.title}
        updateState={(_, value) => form.updateData({ title: value })}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.titleField}
      />
      <RichText
        placeHolderText="Description"
        pathToState="description"
        updateState={(_, value) => form.updateData({ description: value })}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.descriptionField}
      />
      <RichText
        placeHolderText="Materials"
        content={form.Data.materials}
        updateState={(_, value) => form.updateData({ materials: value })}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.materialsField}
      />
      <Selector
        title="Type"
        value={form.Data.type}
        options={programTypes}
        updateState={(_, value) =>
          form.updateData({ type: value as ProgramTypes })
        }
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.typeSelector}
      />
      <Selector
        title="Category"
        value={form.Data.category}
        options={programCategories}
        updateState={(_, value) =>
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
        updateState={(_, value) => form.updateData({ trials: value as number })}
        isNumber={true}
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.stepsSelector}
      />
      <Selector
        title="Target Style"
        pathToState="targetStyle"
        value={form.Data.targetStyle}
        options={targetStyles}
        updateState={(_, value) =>
          form.updateData({ targetStyle: value as TargetStyle })
        }
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramPageMetaTestIds.ruleStyleSelector}
      />
      <Field
        placeHolderText="Mastery Independence Target (%)"
        pathToState="masteryTarget"
        value={form.Data.masteryTarget?.toString()}
        updateState={(_, value) =>
          form.updateData({ masteryTarget: parseInt(value) })
        }
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramsPageMetaTestIds.masteryTarget}
      />
      <Field
        placeHolderText="Mastery Consecutive Requriement"
        pathToState="masteryConsecutiveTargets"
        value={form.Data.masteryConsecutiveTargets?.toString()}
        updateState={(_, value) =>
          form.updateData({ masteryConsecutiveTargets: parseInt(value) })
        }
        readOnly={isReadOnlyMode(mode)}
        metaTestId={ProgramsPageMetaTestIds.masteryConsecutive}
      />

      {form.Data.targetStyle === TargetStyle.TaskAnalysis && (
        <Selector
          title="Chaining Style"
          pathToState="chaining.type"
          value={form.Data.chaining?.type}
          options={chainingTypesOptions}
          updateState={(_, value) =>
            form.updateData(
              { chaining: { type: value as TrialChainingDirections } },
              true
            )
          }
          readOnly={isReadOnlyMode(mode)}
          metaTestId={ProgramPageMetaTestIds.chaingDirections}
        />
      )}
      {Array.isArray(form.Data.targetOptions) && (
        <TargetOptionSelector
          form={form}
          targetOptions={form.Data.targetOptions as TargetOption[]}
          readOnly={isReadOnlyMode(mode)}
        />
      )}
      {Array.isArray(form.Data.targets) && (
        <TargetForm form={form} readOnly={isReadOnlyMode(mode)} />
      )}
    </>
  );
};
