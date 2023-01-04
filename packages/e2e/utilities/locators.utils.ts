import { UIDataTargetTypes } from "@parsimony/types";

export const findText = (text: string) => cy.contains(text);

export const getButton = (id: string) =>
  cy.get(`[data-cy="${UIDataTargetTypes.Button}:${id}`);

export const getField = (id: string) =>
  cy.get(`[data-cy="${UIDataTargetTypes.Field}:${id}`);

export const getSelect = (id: string) =>
  cy.get(`[data-cy="${UIDataTargetTypes.Selector}:${id}`);

export const getMultiSelect = (id: string) =>
  cy.get(`[data-cy="${UIDataTargetTypes.MultiSelector}:${id}`);

export const getTableAction = (id: string, itemId: string) =>
  cy.get(`[data-cy="${UIDataTargetTypes.Button}:table-action-${id}-${itemId}`);

export const getListItem = (id: string, itemId: string) =>
  cy.get(`[data-cy="${UIDataTargetTypes.ListItem}:list-item-${id}-${itemId}`);
