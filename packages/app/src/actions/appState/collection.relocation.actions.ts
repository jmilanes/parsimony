import { Service } from "typedi";
import CoreApi from "../../domains/coreApi/coreApi.service";
import { Collection, Domains, Program } from "@parsimony/types";
import { CollectionSelector } from "../../services/appStateService";

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
    await this.#api.makeRequest({
      domain: Domains.Collection,
      requestType: "getAllByRelationship",
      payload: {
        relationshipProperty: "clientId",
        id: entity.clientId
      }
    });
    this.updateState({
      idToUpdate: entity.id
    });
  };

  public reset = () => {
    this.#api.updateAppState("dialog", { active: false });
    this.updateState({
      selectedId: undefined,
      idToUpdate: undefined
    });
  };

  public cancel = () => {
    this.#api.updateAppState("dialog", { active: false });
    this.updateState({
      selectedId: undefined
    });
  };

  public setActiveCollection = (collectionId: string) => {
    this.updateState({
      selectedId: collectionId
    });
  };

  public updateEntity = async (domain: Domains) => {
    const { idToUpdate, selectedId } = this.getState();
    const key =
      domain === Domains.Program ? "collectionId" : "parentCollectionId";

    const ancestors = this.#getAncestors(domain);
    //TODO Think about making this its own end point
    this.#api
      .makeRequest({
        domain,
        requestType: "update",
        payload: {
          id: idToUpdate,
          ancestors,
          [key]: selectedId
        }
      })
      .finally(this.reset);
  };

  #getAncestors(domain: Domains) {
    const { selectedId } = this.getState();
    return domain === Domains.Program
      ? undefined
      : [
          ...(this.#api.getItem(Domains.Collection, selectedId).ancestors ||
            []),
          selectedId
        ];
  }
}
