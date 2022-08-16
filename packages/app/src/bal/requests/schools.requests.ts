import {
  Collections,
  CreateSchoolPayload,
  DeleteSchoolPayload,
  UpdateSchoolPayload,
  GetSchoolPayload,
  School
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
  Collections.School,
  fullSchema
);

export const getAllSchools = createRequest<undefined, School[]>(
  schoolOperationStrings.getAll
);

export const getSchool = createRequest<GetSchoolPayload, School>(
  schoolOperationStrings.get
);

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
  create: createSchool,
  delete: deleteSchool,
  update: updateSchool
};
