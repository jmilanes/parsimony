import {
  CreateEventPayload,
  DeleteEventPayload,
  Event,
  GetAllEventsByRelationshipPayload,
  GetEventPayload,
  UpdateEventPayload
} from "@parsimony/types";
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";

export class EventAsyncDataHandler extends AsyncDataHandlerInterface<
  Event,
  CreateEventPayload,
  DeleteEventPayload,
  UpdateEventPayload,
  GetEventPayload,
  GetAllEventsByRelationshipPayload
> {}
