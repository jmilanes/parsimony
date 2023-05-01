import {
  Domains,
  CreateCollectionPayload,
  DeleteCollectionPayload,
  GetAllCollectionsByRelationshipPayload,
  GetCollectionPayload,
  Collection,
  UpdateCollectionPayload
} from "@parsimony/types";
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";
import { collectionRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class CollectionAsyncDataHandler extends AsyncDataHandlerInterface<
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
