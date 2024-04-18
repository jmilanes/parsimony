import {
  checkNotInDocument,
  checkVisibility,
  clickTarget,
  selectOption,
  typeRichTextEditior,
  typeValueToTarget
} from "../../actions.spec";
import {
  BehaviorAddFormMetaTestIds,
  CollectionPageMetaTestIds,
  IntervalBehaviorType,
  Program,
  ProgramViewTypes,
  TaskAnalysis,
  TrialChainingDirections
} from "@parsimony/types";
import { waitFor } from "@testing-library/react";
import { getTableAction, getTableData } from "../../selectors";

export const updateProgramAddFormWithDefaultValues = async ({
  title,
  description,
  viewType,
  chaining
}: Partial<TaskAnalysis>) => {
  // THESE TWO ARE WHERE THE ISSUE IS
  await waitFor(async () => {
    viewType &&
      (await selectOption({
        target: CollectionPageMetaTestIds.addProgramFormTargetStyleSelector,
        selectedOption: viewType,
        // This is always the first item selected in the add form
        currentValue: ProgramViewTypes.DiscreteTrials
      }));
  });

  await waitFor(async () => {
    chaining?.type &&
      (await selectOption({
        target: CollectionPageMetaTestIds.addProgramFormChainingSelector,
        selectedOption: chaining?.type || "",
        // This is always the first item selected in the add form
        currentValue: TrialChainingDirections.Total
      }));
  });

  title &&
    (await typeValueToTarget(
      CollectionPageMetaTestIds.addProgramFormTitleField,
      title
    ));

  description &&
    (await typeRichTextEditior(
      CollectionPageMetaTestIds.addProgramFormDescriptionField,
      description
    ));

  // TODO add Prompts and Targets Here
};

export const deleteCreatedProgram = async (
  tableName: string,
  rowIndex: number
) => {
  await clickTarget(
    getTableAction({
      tableName,
      rowIndex,
      action: "delete"
    })
  );

  await waitFor(async () => {
    await checkNotInDocument(
      getTableData({
        tableName,
        rowIndex,
        colName: "title"
      })
    );
  });
};

export const checkProgramAddButton = async () => {
  await waitFor(async () => {
    await checkVisibility(CollectionPageMetaTestIds.addProgramBtn);
  });
};

export const checkBehaviorAddButton = async () => {
  await waitFor(async () => {
    await checkVisibility(CollectionPageMetaTestIds.addBehaviorBtn);
  });
};

export const updateBehaviorAddFormWithDefaults = async ({
  title,
  description,
  operationalDefinition,
  precursorBehaviors,
  proactiveStrategies,
  reactiveStrategies
}: Partial<IntervalBehaviorType>) => {
  title &&
    (await typeValueToTarget(BehaviorAddFormMetaTestIds.titleField, title));
  description &&
    (await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.descriptionField,
      description
    ));

  operationalDefinition &&
    (await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.operationalDefinitionField,
      operationalDefinition
    ));

  proactiveStrategies &&
    (await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.proactiveStrategiesField,
      proactiveStrategies
    ));

  precursorBehaviors &&
    (await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.precursorBehaviorField,
      precursorBehaviors
    ));

  reactiveStrategies &&
    (await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.reactiveStrategiesField,
      reactiveStrategies
    ));

  await typeValueToTarget(BehaviorAddFormMetaTestIds.masteryTargetField, "80");
};
