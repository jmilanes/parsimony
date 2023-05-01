import {
  Event,
  GetEventPayload,
  CreateEventPayload,
  DeleteEventPayload,
  UpdateEventPayload,
  Domains,
  GetAllEventsByRelationshipPayload
} from "@parsimony/types";
import { createRequest } from "../../utils";
import generateCrudOperationStrings from "./operationStrings/generateCrudOperationStrings";

const fullSchema = `
  id
  title
  agenda
  timeZone
  startTime
  endTime
  repeat
  repeatFrequency
  program
  documents
`;

const eventOperationStrings = generateCrudOperationStrings(
  Domains.Event,
  fullSchema
);

export const getAllEvents = createRequest<undefined, Event[]>(
  eventOperationStrings.getAll
);

export const getEvent = createRequest<GetEventPayload, Event>(
  eventOperationStrings.get
);

export const getAllEventsByRelationship = createRequest<
  GetAllEventsByRelationshipPayload,
  Event[]
>(eventOperationStrings.getAllByRelationship);

export const createEvent = createRequest<CreateEventPayload, Event>(
  eventOperationStrings.create
);

export const deleteEvent = createRequest<DeleteEventPayload, string>(
  eventOperationStrings.deleteItem
);

export const updateEvent = createRequest<UpdateEventPayload, Event>(
  eventOperationStrings.edit
);

export const eventRequests = {
  getAll: getAllEvents,
  get: getEvent,
  getAllByRelationship: getAllEventsByRelationship,
  create: createEvent,
  delete: deleteEvent,
  update: updateEvent
};
