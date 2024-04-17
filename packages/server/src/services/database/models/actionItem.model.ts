import { ObjectId } from "mongodb";

// TODO: Ask Molly what else needs to be here
// ** But this would be really cool to handle server side based on results a
// ** 3 in a row do this
// ** 1 mistake propose a new solution

export default {
  tile: String,
  details: String,
  completed: Boolean,
  ignored: Boolean,
  clientId: { type: ObjectId, ref: "User" }
  // TODO Add Reference when events are added
  // currentEvent:
  // proposedEvent:
};
