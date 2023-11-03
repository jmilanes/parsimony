import { Service } from "typedi";

import { IOrchestrationHandler } from "../orchestrationHandler.interface";
import RequestService from "../../../requests/request.Service";
import ChatService from "../../../services/chat.service";
import AppStateService from "../../../services/appStateService";

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

  constructor(rs: RequestService, cs: ChatService, ac: AppStateService) {
    this.#rs = rs;
  }

  //@ts-ignore
  public requestData = async (
    options: CollectionPageOrchestrationHandlerOptions
  ) => {
    if (!options.collectionId) {
      throw new Error("No Collection included in Data Request");
    }
    await this.#rs.requests.collection?.get({ id: options.collectionId });
    await this.#rs.requests.program?.getAllByRelationship({
      relationshipProperty: "collectionId",
      id: options.collectionId
    });
    await this.#rs.requests.collection?.getAllByRelationship({
      relationshipProperty: "parentCollectionId",
      id: options.collectionId
    });
  };
}
