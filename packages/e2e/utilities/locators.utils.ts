import { UIMetaTargetTypes } from "@parsimony/types";

export const findText = (text: string) => cy.contains(text);

export const getButton = (id: string) =>
  cy.get(`[data-cy="${UIMetaTargetTypes.Button}:${id}`);

export const getField = (id: string) =>
  cy.get(`[data-cy="${UIMetaTargetTypes.Field}:${id}`);

export const getSelect = (id: string) =>
  cy.get(`[data-cy="${UIMetaTargetTypes.Selector}:${id}`);

export const getSelectOption = (id: string, option: string) =>
  cy.get(`[data-cy="${UIMetaTargetTypes.Selector}:${id}-option-${option}`);

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
  cy.get(`[data-cy="${UIMetaTargetTypes.Checkbox}:${id}`);

export const getTableAction = (id: string, itemId: string) =>
  cy.get(`[data-cy="${UIMetaTargetTypes.Button}:table-action-${id}-${itemId}`);

export const getListItem = (id: string, itemId: string) =>
  cy.get(`[data-cy="${UIMetaTargetTypes.ListItem}:list-item-${id}-${itemId}`);

//IDEAs
// Better targeting for rows
// this should probably be a direct call to the API which should be simple but maybe after everything is tested simply pull BAL and Request Utils out
