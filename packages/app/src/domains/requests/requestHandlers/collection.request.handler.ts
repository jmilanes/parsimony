import {
  Domains,
  CreateCollectionPayload,
  Collection,
  UpdateCollectionPayload
} from "@parsimony/types";
import { CrudRequestHandler } from "../CrudRequestHandler";

import { Service } from "typedi";
import { RequestCreatorService } from "../requestCreator.service";
import Store from "../../state/store/store";

@Service()
export class CollectionRequestHandler extends CrudRequestHandler<
  Collection,
  CreateCollectionPayload,
  UpdateCollectionPayload
> {
  domainName = Domains.Collection;
  #rcs: RequestCreatorService;

  constructor(s: Store, rcs: RequestCreatorService) {
    super(s);
    this.#rcs = rcs;
    this.requests = {
      get: this.#rcs.createGetRequest<Collection>("collections"),
      getAll: this.#rcs.createGetAllRequest<Collection[]>("collections"),
      delete: this.#rcs.createDeleteRequest<{ id: string }>("collections"),
      create: this.#rcs.createPostRequest<CreateCollectionPayload, Collection>(
        "collections"
      ),
      update: this.#rcs.createPatchRequest<UpdateCollectionPayload, Collection>(
        "collections"
      )
    };
  }
}
