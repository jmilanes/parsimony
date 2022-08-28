const { gql } = require("apollo-server");

export default gql`
  scalar Date

  type Event {
    id: ID!
    title: String
    agenda: String
    timeZone: String
    startTime: Date
    endTime: Date
    repeat: Boolean
    repeatFrequency: String
    program: [ID]
    documents: [ID]
    users: [ID]
  }

  input CreateEventPayload {
    title: String!
    agenda: String
    timeZone: String!
    startTime: Date!
    endTime: Date!
    repeat: Boolean
    repeatFrequency: String
    program: [ID]
    documents: [ID]
    users: [ID]!
  }

  input DeleteEventPayload {
    id: ID!
  }

  input GetEventPayload {
    id: ID!
  }

  input UpdateEventPayload {
    id: ID!
    title: String
    agenda: String
    timeZone: String!
    startTime: Date!
    endTime: Date!
    repeat: Boolean
    repeatFrequency: String
    program: [ID]
    documents: [ID]
    users: [ID]!
  }

  type Query {
    getAllEvents: [Event]
    getEvent(payload: GetEventPayload): Event
  }

  type Mutation {
    createEvent(payload: CreateEventPayload): Event
    deleteEvent(payload: DeleteEventPayload): ID
    updateEvent(payload: UpdateEventPayload): Event
  }
`;
