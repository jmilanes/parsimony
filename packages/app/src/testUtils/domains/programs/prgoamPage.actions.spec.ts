import {
  DiscreteTrial,
  IntervalBehaviorType,
  Program,
  ProgramPageMetaTestIds,
  TaskAnalysis
} from "@parsimony/types";
import { waitFor } from "@testing-library/react";
import {
  checkReadOnlySelectorValue,
  clearAndTypeValueToTarget,
  typeRichTextEditior
} from "../../actions.spec";
import {
  checkTargetOptionsReadOnlyOptions,
  updateTargetOptionsReadOnlyOptions
} from "./targetOptions.actions.spec";
import {
  checkTargetReadOnlyOptions,
  updateTargetReadOnlyOptions
} from "./targets.actions.spec";
import { DeepPartial } from "chart.js/types/utils";

export const checkProgramReadOnlyValues = async ({
  title,
  description,
  materials,
  type,
  category,
  masteryConsecutiveTargets,
  masteryTarget,
  viewType,
  targetOptions,
  targets
}: Partial<DiscreteTrial | TaskAnalysis>) => {
  await waitFor(async () => {
    title &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.titleField,
        title
      ));
    description &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.descriptionField,
        description
      ));
    materials &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.materialsField,
        materials
      ));
    type &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.typeSelector,
        type
      ));
    category &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.categorySelector,
        category
      ));
    viewType &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.targetStyleSelector,
        viewType
      ));
    masteryTarget &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.masterTargetField,
        masteryTarget.toString()
      ));
    masteryConsecutiveTargets &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.masteryConsecutiveTargetField,
        masteryConsecutiveTargets.toString()
      ));

    //@ts-ignore
    await checkTargetOptionsReadOnlyOptions(targetOptions);
    //@ts-ignore
    await checkTargetReadOnlyOptions(targets);
  });
};

export const checkBehaviorReadOnlyValues = async ({
  title,
  description,
  materials,
  type,
  category,
  masteryConsecutiveTargets,
  masteryTarget,
  viewType,
  operationalDefinition,
  precursorBehaviors,
  proactiveStrategies,
  reactiveStrategies
}: Partial<IntervalBehaviorType>) => {
  await waitFor(async () => {
    title &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.titleField,
        title
      ));
    description &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.descriptionField,
        description
      ));
    materials &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.materialsField,
        materials
      ));
    type &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.typeSelector,
        type
      ));
    category &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.categorySelector,
        category
      ));
    viewType &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.targetStyleSelector,
        viewType
      ));
    masteryTarget &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.masterTargetField,
        masteryTarget.toString()
      ));
    masteryConsecutiveTargets &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.masteryConsecutiveTargetField,
        masteryConsecutiveTargets.toString()
      ));

    operationalDefinition &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.operationalDefinitionField,
        operationalDefinition
      ));

    proactiveStrategies &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.proactiveStrategiesField,
        proactiveStrategies
      ));

    precursorBehaviors &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.precursorBehaviorField,
        precursorBehaviors
      ));

    reactiveStrategies &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.reactiveStrategiesField,
        reactiveStrategies
      ));
  });
};

export const updateProgramPageFields = async ({
  title,
  description,
  materials,
  masteryTarget,
  masteryConsecutiveTargets,
  targetOptions,
  targets
}: DeepPartial<TaskAnalysis | DiscreteTrial>) => {
  title &&
    (await clearAndTypeValueToTarget(ProgramPageMetaTestIds.titleField, title));
  description &&
    (await typeRichTextEditior(
      ProgramPageMetaTestIds.descriptionField,
      description
    ));
  materials &&
    (await typeRichTextEditior(
      ProgramPageMetaTestIds.materialsField,
      materials
    ));

  masteryTarget &&
    (await clearAndTypeValueToTarget(
      ProgramPageMetaTestIds.masterTargetField,
      masteryTarget.toString()
    ));
  masteryConsecutiveTargets &&
    (await clearAndTypeValueToTarget(
      ProgramPageMetaTestIds.masteryConsecutiveTargetField,
      masteryConsecutiveTargets.toString()
    ));
  //@ts-ignore
  targetOptions && (await updateTargetOptionsReadOnlyOptions(targetOptions));
  //@ts-ignore
  targets && (await updateTargetReadOnlyOptions(targets));
};

export const updateBehaviorPageFields = async ({
  title,
  description,
  materials,
  masteryTarget,
  masteryConsecutiveTargets,
  operationalDefinition,
  reactiveStrategies,
  precursorBehaviors,
  proactiveStrategies
}: DeepPartial<IntervalBehaviorType>) => {
  title &&
    (await clearAndTypeValueToTarget(ProgramPageMetaTestIds.titleField, title));
  description &&
    (await typeRichTextEditior(
      ProgramPageMetaTestIds.descriptionField,
      description
    ));
  materials &&
    (await typeRichTextEditior(
      ProgramPageMetaTestIds.materialsField,
      materials
    ));

  masteryTarget &&
    (await clearAndTypeValueToTarget(
      ProgramPageMetaTestIds.masterTargetField,
      masteryTarget.toString()
    ));
  masteryConsecutiveTargets &&
    (await clearAndTypeValueToTarget(
      ProgramPageMetaTestIds.masteryConsecutiveTargetField,
      masteryConsecutiveTargets.toString()
    ));

  operationalDefinition &&
    (await typeRichTextEditior(
      ProgramPageMetaTestIds.operationalDefinitionField,
      operationalDefinition
    ));

  proactiveStrategies &&
    (await typeRichTextEditior(
      ProgramPageMetaTestIds.proactiveStrategiesField,
      proactiveStrategies
    ));

  precursorBehaviors &&
    (await typeRichTextEditior(
      ProgramPageMetaTestIds.precursorBehaviorField,
      precursorBehaviors
    ));

  reactiveStrategies &&
    (await typeRichTextEditior(
      ProgramPageMetaTestIds.reactiveStrategiesField,
      reactiveStrategies
    ));
};
