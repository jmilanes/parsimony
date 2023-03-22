import {
  File,
  GetFilePayload,
  CreateFilePayload,
  DeleteFilePayload,
  UpdateFilePayload,
  Collections,
  GetAllFilesByRelationshipPayload
} from "@parsimony/types";
import { createRequest } from "../../utils";
import generateCrudOperationStrings from "./operationStrings/generateCrudOperationStrings";

const fullSchema = `
  id
  title
  document
  uploadedBy
  clientId
`;

const eventOperationStrings = generateCrudOperationStrings(
  Collections.File,
  fullSchema
);

export const getAllFiles = createRequest<undefined, File[]>(
  eventOperationStrings.getAll
);

export const getFile = createRequest<GetFilePayload, File>(
  eventOperationStrings.get
);

export const getAllFilesByRelationship = createRequest<
  GetAllFilesByRelationshipPayload,
  File[]
>(eventOperationStrings.getAllByRelationship);

export const createFile = createRequest<CreateFilePayload, File>(
  eventOperationStrings.create
);

export const deleteFile = createRequest<DeleteFilePayload, string>(
  eventOperationStrings.deleteItem
);

export const updateFile = createRequest<UpdateFilePayload, File>(
  eventOperationStrings.edit
);

export const fileRequests = {
  getAll: getAllFiles,
  get: getFile,
  getAllByRelationship: getAllFilesByRelationship,
  create: createFile,
  delete: deleteFile,
  update: updateFile
};
