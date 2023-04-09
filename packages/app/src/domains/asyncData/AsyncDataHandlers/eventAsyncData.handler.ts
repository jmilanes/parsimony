import {
  StoreCollections,
  CreateEventPayload,
  DeleteEventPayload,
  Event,
  GetAllEventsByRelationshipPayload,
  GetEventPayload,
  UpdateEventPayload
} from "@parsimony/types";
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";
import { eventRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class EventAsyncDataHandler extends AsyncDataHandlerInterface<
  Event,
  CreateEventPayload,
  DeleteEventPayload,
  UpdateEventPayload,
  GetEventPayload,
  GetAllEventsByRelationshipPayload
> {
  collectionName = StoreCollections.Event;
  requests = eventRequests;
}
