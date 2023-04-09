import {
  StoreCollections,
  CreateUserPayload,
  DeleteUserPayload,
  GetAllUsersByRelationshipPayload,
  GetUserPayload,
  UpdateUserPayload,
  User
} from "@parsimony/types";
import { createRequest } from "../../utils";
import generateCrudOperationStrings from "./operationStrings/generateCrudOperationStrings";

export const fullSchema = `
  id
  updated_at
  created_at
  schoolId
  timeZone
  roles
  type
  documents
  password
  email
  firstName
  lastName
  dateOfBirth
  phone
  contacts
  clients
  programs
  actionItems
  serviceProvider
`;

export const userOperationStrings = generateCrudOperationStrings(
  StoreCollections.User,
  fullSchema
);

export const getAllUsers = createRequest<undefined, User[]>(
  userOperationStrings.getAll
);

export const getUser = createRequest<GetUserPayload, User>(
  userOperationStrings.get
);

export const getAllUsersByRelationship = createRequest<
  GetAllUsersByRelationshipPayload,
  User[]
>(userOperationStrings.getAllByRelationship);

export const createUser = createRequest<CreateUserPayload, User>(
  userOperationStrings.create
);

export const deleteUser = createRequest<DeleteUserPayload, string>(
  userOperationStrings.deleteItem
);

export const updateUser = createRequest<UpdateUserPayload, User>(
  userOperationStrings.edit
);

export const userRequests = {
  getAll: getAllUsers,
  get: getUser,
  create: createUser,
  delete: deleteUser,
  update: updateUser,
  getAllByRelationship: getAllUsersByRelationship
};
