import {
  Domains,
  CreateCollectionPayload,
  DeleteCollectionPayload,
  GetAllCollectionsByRelationshipPayload,
  GetCollectionPayload,
  Collection,
  UpdateCollectionPayload
} from "@parsimony/types";
import { CrudRequestHandler } from "../CrudRequestHandler";

import { Service } from "typedi";
import { createRestRequest } from "../request.utils";

@Service()
export class CollectionRequestHandler extends CrudRequestHandler<
  Collection,
  CreateCollectionPayload,
  DeleteCollectionPayload,
  UpdateCollectionPayload,
  GetCollectionPayload,
  GetAllCollectionsByRelationshipPayload
> {
  domainName = Domains.Collection;
  requests = {
    get: createRestRequest<GetCollectionPayload, Collection>(
      "GET",
      "collections"
    ),
    getAll: createRestRequest<undefined, Collection[]>("GET", "collections"),
    delete: createRestRequest<DeleteCollectionPayload, string>(
      "DELETE",
      "collections"
    ),
    create: createRestRequest<CreateCollectionPayload, Collection>(
      "POST",
      "collections"
    ),
    update: createRestRequest<UpdateCollectionPayload, Collection>(
      "POST",
      "collections"
    )
  };
}
