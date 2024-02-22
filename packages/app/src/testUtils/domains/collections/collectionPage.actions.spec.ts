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
  Program,
  TargetStyle,
  TrialChainingDirections
} from "@parsimony/types";
import { waitFor } from "@testing-library/react";
import { getTableAction, getTableData } from "../../selectors";

export const updateProgramAddFormWithDefaultValues = async ({
  title,
  description,
  targetStyle,
  chaining
}: Partial<Program>) => {
  // THESE TWO ARE WHERE THE ISSUE IS
  await waitFor(async () => {
    targetStyle &&
      (await selectOption({
        target: CollectionPageMetaTestIds.addProgramFormTargetStyleSelector,
        selectedOption: targetStyle,
        // This is always the first item selected in the add form
        currentValue: TargetStyle.DiscreteTrials
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
  behavior = {}
}: Partial<Program>) => {
  title &&
    (await typeValueToTarget(BehaviorAddFormMetaTestIds.titleField, title));
  description &&
    (await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.descriptionField,
      description
    ));

  behavior?.operationalDefinition &&
    (await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.operationalDefinitionField,
      behavior?.operationalDefinition
    ));

  behavior?.proactiveStrategies &&
    (await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.proactiveStrategiesField,
      behavior?.proactiveStrategies
    ));

  behavior?.precursorBehaviors &&
    (await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.precursorBehaviorField,
      behavior?.precursorBehaviors
    ));

  behavior?.reactiveStrategies &&
    (await typeRichTextEditior(
      BehaviorAddFormMetaTestIds.reactiveStrategiesField,
      behavior?.reactiveStrategies
    ));

  await typeValueToTarget(BehaviorAddFormMetaTestIds.masteryTargetField, "80");
};
