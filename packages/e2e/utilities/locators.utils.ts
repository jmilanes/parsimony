import { UIMetaTargetTypes } from "@parsimony/types";

export const findText = (text: string) => cy.contains(text);

export const getButton = (id: string) =>
  cy.get(`[data-cy="${UIMetaTargetTypes.Button}:${id}`);

export const getField = (id: string) =>
  cy.get(`[data-cy="${UIMetaTargetTypes.Field}:${id}`);

export const getSelect = (id: string) =>
  cy.get(`[data-cy="${UIMetaTargetTypes.Selector}:${id}`);

export const getMultiSelect = (id: string) =>
  cy.get(`[data-cy="${UIMetaTargetTypes.MultiSelector}:${id}`);

export const getTableAction = (id: string, itemId: string) =>
  cy.get(`[data-cy="${UIMetaTargetTypes.Button}:table-action-${id}-${itemId}`);

export const getListItem = (id: string, itemId: string) =>
  cy.get(`[data-cy="${UIMetaTargetTypes.ListItem}:list-item-${id}-${itemId}`);
