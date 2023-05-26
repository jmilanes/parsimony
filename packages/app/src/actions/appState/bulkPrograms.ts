import { Container } from "typedi";
import UIApi from "../../domains/uiApi/uiApi.Service";
import { BulkProgram } from "../../services/appStateService";

export const getBulkProgramsState = () => {
  const API = Container.get(UIApi);
  return API.getAppState("bulkPrograms");
};

export const addIdToBulkProgramProperty = (
  id: String,
  propertyName: keyof BulkProgram
) => {
  const API = Container.get(UIApi);
  const state = getBulkProgramsState();
  if (!Array.isArray(state[propertyName])) {
    throw new Error(
      "Tried to resolve a property name on bulk program that was not an array!"
    );
  }
  const current = Array.isArray(state[propertyName])
    ? (state[propertyName] as [])
    : [];
  API.updateAppState("bulkPrograms", {
    [propertyName]: [...current, id]
  });
};

export const removeIdFromBulkProgramProperty = (
  id: String,
  propertyName: keyof BulkProgram
) => {
  const API = Container.get(UIApi);
  const state = getBulkProgramsState();
  if (!Array.isArray(state[propertyName])) {
    throw new Error(
      "Tried to resolve a property name on bulk program that was not an array!"
    );
  }
  const current = Array.isArray(state[propertyName])
    ? (state[propertyName] as [])
    : [];
  API.updateAppState("bulkPrograms", {
    [propertyName]: current.filter((cid) => cid !== id)
  });
};

export const isIdIncludedInBulkProgramProperty = (
  id: string,
  propertyName: keyof BulkProgram
) => {
  const target = getBulkProgramsState()[propertyName];
  if (Array.isArray(target)) {
    return target.includes(id);
  }
};
