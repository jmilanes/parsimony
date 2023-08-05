import { Service } from "typedi";

import { BulkProgram } from "../../services/appStateService";
import { exactIncludes } from "../../utils";
import CoreApi from "../../domains/coreApi/coreApi.service";

@Service()
export class BulkProgramsActions {
  #api: CoreApi;

  constructor(_api: CoreApi) {
    this.#api = _api;
  }

  public getBulkProgramsState = () => {
    return this.#api.getAppState("bulkPrograms");
  };

  public addIdToBulkProgramProperty = (
    id: String,
    propertyName: keyof BulkProgram
  ) => {
    const state = this.getBulkProgramsState();
    if (!Array.isArray(state[propertyName])) {
      throw new Error(
        "Tried to resolve a property name on bulk program that was not an array!"
      );
    }
    const current = Array.isArray(state[propertyName])
      ? (state[propertyName] as [])
      : [];
    this.#api.updateAppState("bulkPrograms", {
      [propertyName]: [...current, id]
    });
  };

  public removeIdFromBulkProgramProperty = (
    id: String,
    propertyName: keyof BulkProgram
  ) => {
    const state = this.getBulkProgramsState();
    if (!Array.isArray(state[propertyName])) {
      throw new Error(
        "Tried to resolve a property name on bulk program that was not an array!"
      );
    }
    const current = Array.isArray(state[propertyName])
      ? (state[propertyName] as [])
      : [];
    this.#api.updateAppState("bulkPrograms", {
      [propertyName]: current.filter((cid) => cid !== id)
    });
  };

  public isIdIncludedInBulkProgramProperty = (
    id: string,
    propertyName: keyof BulkProgram
  ) => {
    const target = this.getBulkProgramsState()[propertyName];
    if (Array.isArray(target)) {
      return exactIncludes(target, id);
    }
  };
}
