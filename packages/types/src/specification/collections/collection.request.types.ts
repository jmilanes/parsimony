import { Collection } from "./collection.types";
import { BasicPayload, ByRelationshipPayload } from "../shared";

export type CreateCollectionPayload = Omit<Collection, "id">;
export type UpdateCollectionPayload = Collection;
export type DeleteCollectionPayload = BasicPayload;
export type GetAllCollectionsByRelationshipPayload = ByRelationshipPayload;
export type GetCollectionPayload = BasicPayload;
