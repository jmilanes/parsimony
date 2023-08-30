import { Service } from "typedi";
import CoreApi from "../../domains/coreApi/coreApi.service";
import { Domains, Program } from "@parsimony/types";
import { CollectionSelector } from "../../services/appStateService";

@Service()
export class ProgramManipulationActions {
  #api: CoreApi;

  constructor(_api: CoreApi) {
    this.#api = _api;
  }

  public getState = () => {
    return this.#api.getAppState("collectionSelector");
  };

  public updateState = (update: Partial<CollectionSelector>) => {
    this.#api.updateAppState("collectionSelector", update);
  };

  public init = (program: Program) => {
    this.updateState({
      program
    });
  };

  public reset = () => {
    this.updateState({
      selectedId: undefined,
      program: undefined
    });
  };

  public cancel = () => {
    this.updateState({
      selectedId: undefined
    });
  };

  public getSelectedId = () => {
    return this.getState().selectedId;
  };

  public setActiveCollection = (collectionId: string) => {
    this.updateState({
      selectedId: collectionId
    });
  };

  public updateProgram = async () => {
    await this.#api
      .makeRequest({
        domain: Domains.Program,
        requestType: "update",
        payload: {
          ...this.getState().program,
          collectionId: this.getSelectedId()
        }
      })
      .finally(this.reset);
  };
}
