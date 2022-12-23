import { UIDataTargetTypes } from "@parsimony/types";

export const getButton = (id: string) =>
  cy.get(`[data-cy="${UIDataTargetTypes.Button}:${id}`);

export const getField = (id: string) =>
  cy.get(`[data-cy="${UIDataTargetTypes.Field}:${id}`);
