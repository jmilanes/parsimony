import {
  Domains,
  CreateCollectionPayload,
  DeleteCollectionPayload,
  GetAllCollectionsByRelationshipPayload,
  GetCollectionPayload,
  Collection,
  UpdateCollectionPayload
} from "@parsimony/types";
import { IRequestHandler } from "../IRequestHandler";
import { collectionRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class CollectionRequestHandler extends IRequestHandler<
  Collection,
  CreateCollectionPayload,
  DeleteCollectionPayload,
  UpdateCollectionPayload,
  GetCollectionPayload,
  GetAllCollectionsByRelationshipPayload
> {
  domainName = Domains.Collection;
  requests = collectionRequests;
}
