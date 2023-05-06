import {
  Domains,
  CreateEventPayload,
  DeleteEventPayload,
  Event,
  GetAllEventsByRelationshipPayload,
  GetEventPayload,
  UpdateEventPayload
} from "@parsimony/types";
import { IRequestHandler } from "../IRequestHandler";
import { eventRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class EventRequestHandler extends IRequestHandler<
  Event,
  CreateEventPayload,
  DeleteEventPayload,
  UpdateEventPayload,
  GetEventPayload,
  GetAllEventsByRelationshipPayload
> {
  domainName = Domains.Event;
  requests = eventRequests;
}
