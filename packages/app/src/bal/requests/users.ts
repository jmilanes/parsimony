import {
  User,
  GetUserPayload,
  CreateUserPayload,
  DeleteUserPayload,
  UpdateUserPayload
} from "@parsimony/types";
import { createQueryRequestFn, createMutationRequestFn } from "../../utils";
import operationStrings from "../operationStrings";

export const getAllUsers = createQueryRequestFn<User[], undefined>(
  operationStrings.users.getAllUsers
);

export const getUser = createQueryRequestFn<User, GetUserPayload>(
  operationStrings.users.getUser
);

export const createUser = createMutationRequestFn<CreateUserPayload>(
  operationStrings.users.createUser
);

export const deleteUser = createMutationRequestFn<DeleteUserPayload>(
  operationStrings.users.deleteUser
);

export const updateUser = createMutationRequestFn<UpdateUserPayload>(
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
