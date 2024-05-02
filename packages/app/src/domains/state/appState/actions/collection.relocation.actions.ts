import { Service } from "typedi";
import CoreApi from "../../../accessApis/coreApi/coreApi.service";
import { Collection, Domains, Program } from "@parsimony/types";
import { CollectionSelector } from "../appState.types";

@Service()
export class CollectionRelocationActions {
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

  public init = async (entity: Program | Collection) => {
    await this.#api.Requests.operation.getAllByRelationship({
      relationshipProperty: "clientId",
      id: entity.clientId || "",
      model: Domains.Collection
    });
    this.updateState({
      idToUpdate: entity.id
    });
  };

  public reset = () => {
    this.#api.Dialog.close();
    this.updateState({
      selectedId: undefined,
      idToUpdate: undefined
    });
  };

  public cancel = () => {
    this.#api.Dialog.close();
    this.updateState({
      selectedId: undefined
    });
  };

  public setActiveCollection = (collectionId: string) => {
    this.updateState({
      selectedId: collectionId
    });
  };

  public updateCollection = async () => {
    const { idToUpdate, selectedId } = this.getState();

    const ancestors = this.#getAncestors();
    if (!idToUpdate) {
      return;
    }
    this.#api.Requests.collection
      .update(idToUpdate, {
        id: idToUpdate,
        ancestors,
        parentCollectionId: selectedId
      })
      .finally(this.reset);
  };

  public updateProgram = async () => {
    const { idToUpdate, selectedId } = this.getState();

    if (!idToUpdate) {
      return;
    }
    this.#api.Requests[Domains.Program]
      .update(idToUpdate, {
        id: idToUpdate || "",
        collectionId: selectedId
      })
      .finally(this.reset);
  };

  #getAncestors() {
    const { selectedId } = this.getState();
    return [
      ...(this.#api.getItem(Domains.Collection, selectedId).ancestors || []),
      selectedId
    ];
  }
}
