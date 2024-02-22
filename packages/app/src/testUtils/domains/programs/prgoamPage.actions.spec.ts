import { Program, ProgramPageMetaTestIds } from "@parsimony/types";
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

export const checkProgramReadOnlyValues = async ({
  title,
  description,
  materials,
  type,
  category,
  masteryConsecutiveTargets,
  masteryTarget,
  targetStyle,
  targetOptions,
  targets,
  behavior
}: Partial<Program>) => {
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
    targetStyle &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.targetStyleSelector,
        targetStyle
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

    behavior?.operationalDefinition &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.operationalDefinitionField,
        behavior?.operationalDefinition
      ));

    behavior?.proactiveStrategies &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.proactiveStrategiesField,
        behavior?.proactiveStrategies
      ));

    behavior?.precursorBehaviors &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.precursorBehaviorField,
        behavior?.precursorBehaviors
      ));

    behavior?.reactiveStrategies &&
      (await checkReadOnlySelectorValue(
        ProgramPageMetaTestIds.reactiveStrategiesField,
        behavior?.reactiveStrategies
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
  targets,
  behavior
}: Partial<Program>) => {
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

  behavior?.operationalDefinition &&
    (await typeRichTextEditior(
      ProgramPageMetaTestIds.operationalDefinitionField,
      behavior?.operationalDefinition
    ));

  behavior?.proactiveStrategies &&
    (await typeRichTextEditior(
      ProgramPageMetaTestIds.proactiveStrategiesField,
      behavior?.proactiveStrategies
    ));

  behavior?.precursorBehaviors &&
    (await typeRichTextEditior(
      ProgramPageMetaTestIds.precursorBehaviorField,
      behavior?.precursorBehaviors
    ));

  behavior?.reactiveStrategies &&
    (await typeRichTextEditior(
      ProgramPageMetaTestIds.reactiveStrategiesField,
      behavior?.reactiveStrategies
    ));
};
