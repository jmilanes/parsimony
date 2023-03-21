import {
  MetaTestIds,
  ObservationMetaTestIds,
  UIMetaTargetTypes
} from "@parsimony/types";

export const findText = (text: string) => cy.contains(text);

export const getButton = (id: string) =>
  cy.get(`[data-test-id="${UIMetaTargetTypes.Button}:${id}`);

export const getField = (id: string) =>
  cy.get(`[data-test-id="${UIMetaTargetTypes.Field}:${id}`);

export const getSelect = (id: string) =>
  cy.get(`[data-test-id="${UIMetaTargetTypes.Selector}:${id}`);

export const getSelectOption = (id: string, option: string) =>
  cy.get(`[data-test-id="${UIMetaTargetTypes.Selector}:${id}-option-${option}`);

export const selectOption = (id: string, option: string) => {
  getSelect(id).click();
  getSelectOption(id, option).click();
};

export const selectMultipleOptions = (id: string, options: string[]) => {
  options.forEach((option) => {
    getSelect(id).click();
    getSelectOption(id, option).click();
  });
};

export const getCheckBox = (id: string) =>
  cy.get(`[data-test-id="${UIMetaTargetTypes.Checkbox}:${id}`);

export const getListItem = (id: string, itemId: string) =>
  cy.get(
    `[data-test-id="${UIMetaTargetTypes.ListItem}:list-item-${id}-${itemId}`
  );

export const getTableRowItem = (
  tableId: string,
  rowId: string,
  colName: string
) => cy.get(`[data-test-id="${tableId}-row-${rowId}-col-${colName}"`);

export const getTableRowAction = (
  tableId: string,
  rowId: string,
  action: string
) =>
  getTableRowItem(
    `${UIMetaTargetTypes.Button}:${tableId}`,
    rowId,
    `${action}-table-action`
  );

export const readOnlyLocator = (metaTestId: string) =>
  `${metaTestId}-read-only`;

export const getTargetOptionButton = (
  targetIndex: number,
  propmptIndex: number
) =>
  getButton(
    `${ObservationMetaTestIds.ruleOptionSelectBtn}-target-${targetIndex}-prompt-${propmptIndex}`
  );

export const getSeparateObserveButton = (targetIndex: number) =>
  getButton(`${ObservationMetaTestIds.selectRuleBtn}-target-${targetIndex}`);
