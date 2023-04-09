import {
  StoreCollections,
  CreateSchoolPayload,
  DeleteSchoolPayload,
  GetAllSchoolByRelationshipPayload,
  GetSchoolPayload,
  School,
  UpdateSchoolPayload
} from "@parsimony/types";
import { createRequest } from "../../utils";
import generateCrudOperationStrings from "./operationStrings/generateCrudOperationStrings";

const fullSchema = `
    id
    name
    domain
    userCount
    accessTokens
    updated_at
    created_at
`;

const schoolOperationStrings = generateCrudOperationStrings(
  StoreCollections.School,
  fullSchema
);

export const getAllSchools = createRequest<undefined, School[]>(
  schoolOperationStrings.getAll
);

export const getSchool = createRequest<GetSchoolPayload, School>(
  schoolOperationStrings.get
);

export const getAllSchoolsByRelationship = createRequest<
  GetAllSchoolByRelationshipPayload,
  School[]
>(schoolOperationStrings.getAllByRelationship);

export const createSchool = createRequest<CreateSchoolPayload, School>(
  schoolOperationStrings.create
);

export const deleteSchool = createRequest<DeleteSchoolPayload, string>(
  schoolOperationStrings.deleteItem
);

export const updateSchool = createRequest<UpdateSchoolPayload, School>(
  schoolOperationStrings.edit
);

export const schoolRequests = {
  getAll: getAllSchools,
  get: getSchool,
  getAllByRelationship: getAllSchoolsByRelationship,
  create: createSchool,
  delete: deleteSchool,
  update: updateSchool
};
