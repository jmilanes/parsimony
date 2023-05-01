import { ObjectId } from "mongodb";

const { gql } = require("apollo-server");

export default gql`
  scalar Date

  type Collection {
    id: ID!
    title: String
    ancestors: [ID]
    collections: [ID]
    programs: [ID]
    created_by: ID
  }

  input CreateCollectionPayload {
    title: String!
    ancestors: [ID]
    collections: [ID]
    programs: [ID]
    created_by: ID
  }

  input DeleteCollectionPayload {
    id: ID!
  }

  input GetCollectionPayload {
    id: ID!
  }

  input UpdateCollectionPayload {
    id: ID!
    title: String!
    ancestors: [ID]
    collections: [ID]
    programs: [ID]
    created_by: ID
  }

  input GetAllCollectionsByRelationshipPayload {
    relationshipProperty: String!
    id: ID!
  }

  type Query {
    getAllCollections: [Collection]
    getCollection(payload: GetCollectionPayload): Collection
    getAllCollectionsByRelationship(
      payload: GetAllCollectionsByRelationshipPayload
    ): [Collection]
  }

  type Mutation {
    createCollection(payload: CreateCollectionPayload): Collection
    deleteCollection(payload: DeleteCollectionPayload): ID
    updateCollection(payload: UpdateCollectionPayload): Collection
  }
`;
