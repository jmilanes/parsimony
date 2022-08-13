import {
  User,
  GetUserPayload,
  CreateUserPayload,
  DeleteUserPayload,
  UpdateUserPayload,
  Collections
} from "@parsimony/types";
import { createRequest } from "../../utils";
import generateCrudOperationStrings from "./operationStrings/generateCrudOperationStrings";

const fullSchema = `
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
`;

const userOperationStrings = generateCrudOperationStrings(
  Collections.User,
  fullSchema
);

export const getAllUsers = createRequest<undefined, User[]>(
  userOperationStrings.getAll
);

export const getUser = createRequest<GetUserPayload, User>(
  userOperationStrings.get
);

export const createUser = createRequest<CreateUserPayload, User>(
  userOperationStrings.create
);

export const deleteUser = createRequest<DeleteUserPayload, string>(
  userOperationStrings.deleteItem
);

export const updateUser = createRequest<UpdateUserPayload, User>(
  userOperationStrings.edit
);

const userRequests = {
  getAll: getAllUsers,
  get: getUser,
  create: createUser,
  delete: deleteUser,
  update: updateUser
};

export default userRequests;
