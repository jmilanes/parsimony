import {
  GetCollectionPayload,
  CreateCollectionPayload,
  DeleteCollectionPayload,
  UpdateCollectionPayload,
  Domains,
  GetAllCollectionsByRelationshipPayload,
  Collection
} from "@parsimony/types";
import { createRequest } from "../../utils";
import generateCrudOperationStrings from "./operationStrings/generateCrudOperationStrings";

const fullSchema = `
  id
  title
  ancestors
  parentCollectionId
  created_by
  type
  category
  clientId
`;

const eventOperationStrings = generateCrudOperationStrings(
  Domains.Collection,
  fullSchema
);

export const getAllCollections = createRequest<undefined, Collection[]>(
  eventOperationStrings.getAll
);

export const getCollection = createRequest<GetCollectionPayload, Collection>(
  eventOperationStrings.get
);

export const getAllCollectionsByRelationship = createRequest<
  GetAllCollectionsByRelationshipPayload,
  Collection[]
>(eventOperationStrings.getAllByRelationship);

export const createCollection = createRequest<
  CreateCollectionPayload,
  Collection
>(eventOperationStrings.create);

export const deleteCollection = createRequest<DeleteCollectionPayload, string>(
  eventOperationStrings.deleteItem
);

export const updateCollection = createRequest<
  UpdateCollectionPayload,
  Collection
>(eventOperationStrings.edit);

export const collectionRequests = {
  getAll: getAllCollections,
  get: getCollection,
  getAllByRelationship: getAllCollectionsByRelationship,
  create: createCollection,
  delete: deleteCollection,
  update: updateCollection
};
