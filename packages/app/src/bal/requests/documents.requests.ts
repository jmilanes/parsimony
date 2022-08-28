import {
  Collections,
  CreateDocumentPayload,
  DeleteDocumentPayload,
  UpdateDocumentPayload,
  GetDocumentPayload,
  Document
} from "@parsimony/types";
import { createRequest } from "../../utils";
import generateCrudOperationStrings from "./operationStrings/generateCrudOperationStrings";

const fullSchema = `
  id
  title
  clientId
  details
  signature
  completed
`;

const documentOperationStrings = generateCrudOperationStrings(
  Collections.Document,
  fullSchema
);

export const getAllDocuments = createRequest<undefined, Document[]>(
  documentOperationStrings.getAll
);

export const getDocument = createRequest<GetDocumentPayload, Document>(
  documentOperationStrings.get
);

export const createDocument = createRequest<CreateDocumentPayload, Document>(
  documentOperationStrings.create
);

export const deleteDocument = createRequest<DeleteDocumentPayload, string>(
  documentOperationStrings.deleteItem
);

export const updateDocument = createRequest<UpdateDocumentPayload, Document>(
  documentOperationStrings.edit
);

export const documentRequests = {
  getAll: getAllDocuments,
  get: getDocument,
  create: createDocument,
  delete: deleteDocument,
  update: updateDocument
};
