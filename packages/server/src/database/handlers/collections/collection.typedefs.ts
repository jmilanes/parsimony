import { ObjectId } from "mongodb";

const { gql } = require("apollo-server");

//TODO: ADD Client ID
export default gql`
  scalar Date

  type Collection {
    id: ID!
    title: String
    ancestors: [ID]
    parentCollectionId: ID
    created_by: ID
    type: CollectionTypes
    category: CollectionCategories
  }

  input CreateCollectionPayload {
    title: String!
    ancestors: [ID]
    parentCollectionId: ID
    created_by: ID
    type: CollectionTypes!
    category: CollectionCategories
  }

  input DeleteCollectionPayload {
    id: ID!
  }

  input GetCollectionPayload {
    id: ID!
  }

  input UpdateCollectionPayload {
    id: ID!
    ancestors: [ID]
    title: String!
    parentCollectionId: ID
    created_by: ID
    type: CollectionTypes!
    category: CollectionCategories
  }

  input GetAllCollectionsByRelationshipPayload {
    relationshipProperty: String!
    id: ID
  }

  enum CollectionCategories {
    BOOK
    SUB
  }

  enum CollectionTypes {
    MAIN
    CLIENT
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
