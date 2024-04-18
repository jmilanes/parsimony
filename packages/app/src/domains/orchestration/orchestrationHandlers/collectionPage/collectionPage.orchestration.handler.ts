import { Service } from "typedi";

import { IOrchestrationHandler } from "../orchestrationHandler.interface";
import RequestService from "../../../requests/request.Service";

import { Program } from "@parsimony/types";

export interface CollectionPageOrchestrationHandlerOptions {
  collectionId?: string;
}

/**
 * State up data
 */
@Service()
export class CollectionPageOrchestrationHandler
  implements IOrchestrationHandler
{
  #rs: RequestService;

  constructor(rs: RequestService) {
    this.#rs = rs;
  }

  //@ts-ignore
  public requestData = async (
    options: CollectionPageOrchestrationHandlerOptions
  ) => {
    if (!options.collectionId) {
      throw new Error("No Collection included in Data Request");
    }
    await this.#rs.collection?.get({ id: options.collectionId });
    await this.#rs.operation.getAllByRelationship<Program>({
      model: "program",
      relationshipProperty: "collectionId",
      id: options.collectionId
    });
    await this.#rs.operation?.getAllByRelationship({
      model: "collection",
      relationshipProperty: "parentCollectionId",
      id: options.collectionId
    });
  };
}
