import { Collection } from "./collection.types";
import { BasicPayload, ByRelationshipPayload } from "../shared";
import { DeepPartial } from "chart.js/types/utils";

export type CreateCollectionPayload = Omit<Collection, "id">;
export type UpdateCollectionPayload = DeepPartial<Collection>;
export type DeleteCollectionPayload = BasicPayload;
export type GetAllCollectionsByRelationshipPayload = ByRelationshipPayload;
export type GetCollectionPayload = BasicPayload;
