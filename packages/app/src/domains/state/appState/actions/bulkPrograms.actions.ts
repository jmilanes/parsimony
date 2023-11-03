import { Service } from "typedi";

import { BulkProgram } from "../appState.types";
import { exactIncludes } from "../../../../utils";
import CoreApi from "../../../accessApis/coreApi/coreApi.service";
import { Domains } from "@parsimony/types";
import { omit } from "ramda";
import { message } from "antd";
import { ActionUtiltites } from "./utilities.actions";

@Service()
export class BulkProgramsActions {
  #api: CoreApi;
  #utils: ActionUtiltites;

  constructor(_api: CoreApi, utils: ActionUtiltites) {
    this.#api = _api;
    this.#utils = utils;
  }

  public state = () => {
    return this.#api.getAppState("bulkPrograms");
  };

  public resetBulkProgram = () => {
    return this.#api.updateAppState("bulkPrograms", {
      active: false,
      collectionIds: [],
      programIds: [],
      subscribers: [],
      excludedIds: [],
      clientId: undefined
    });
  };

  public getSelectedClient = () => {
    const { clientId } = this.state();
    return this.#utils.getClient(clientId);
  };

  public addIdToBulkProgramProperty = (
    id: String,
    propertyName: keyof BulkProgram
  ) => {
    const state = this.state();
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
    const state = this.state();
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
    const target = this.state()[propertyName];
    if (Array.isArray(target)) {
      return exactIncludes(target, id);
    }
  };

  public startSelections = (clientId: string) => {
    this.resetBulkProgram();
    this.#api.updateAppState("bulkPrograms", {
      active: true,
      clientId: clientId
    });

    this.#api.updateAppState("drawer", {
      active: false
    });
  };

  public submitBulkPrograms = async () => {
    const payload = omit(["active"], this.#api.getAppState("bulkPrograms"));

    try {
      await this.#api.makeRequest({
        domain: Domains.Program,
        requestType: "addProgramsToClient",
        payload
      });
      this.resetBulkProgram();
      this.#api.updateAppState("bulkPrograms", {
        active: false
      });
      this.#api.updateAppState("drawer", {
        active: false
      });
    } catch (e) {
      message.error("Programs Not Added To Client");
    }
  };
}
