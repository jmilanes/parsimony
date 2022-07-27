import {
  User,
  GetUserPayload,
  CreateUserPayload,
  DeleteUserPayload,
  UpdateUserPayload
} from "@parsimony/types";
import { createRequest } from "../../utils";
import operationStrings from "../operationStrings";

export const getAllUsers = createRequest<undefined, User[]>(
  operationStrings.users.getAllUsers
);

export const getUser = createRequest<GetUserPayload, User>(
  operationStrings.users.getUser
);

export const createUser = createRequest<CreateUserPayload, User>(
  operationStrings.users.createUser
);

export const deleteUser = createRequest<DeleteUserPayload, { id: string }>(
  operationStrings.users.deleteUser
);

export const updateUser = createRequest<UpdateUserPayload, User>(
  operationStrings.users.editUser
);

// ** Once th damn thing works
// Draw up the flow
// Don't feel stuck in your current classes (you already know it is not ideal for async)
// Take a step back draw what you currently have see where you can inject async to find gaps
// See if observables it the way to go
// Then copy pattern for other things!
// This will be a good way to understand the flow and the pattern you are using now - before diving in

// Then make login work on safari
