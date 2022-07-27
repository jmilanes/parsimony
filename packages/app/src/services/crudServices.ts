import crudGenerator from "./crudGenerators/crudGeneratorWithLocalStorage";
import {
  Collections,
  CreateUserPayload,
  DeleteUserPayload,
  UpdateUserPayload
} from "@parsimony/types";
import { ISchool, User, IProgram, IResult, Thread } from "@parsimony/types";
import { asyncCrudGenerator, Store } from "./store";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser
} from "../bal/requests/users";
import StateService from "./stateService";

export const store = new Store();
export const StateManger = new StateService(store);

const userRequests = {
  fetch: getAllUsers,
  create: createUser,
  delete: deleteUser,
  update: updateUser
};

export const SchoolService = crudGenerator<ISchool>(Collections.School);
// export const UserService = crudGenerator<IUser>(Collections.User);
export const UserService = asyncCrudGenerator<
  User,
  CreateUserPayload,
  DeleteUserPayload,
  UpdateUserPayload
>(Collections.User, userRequests, store);
export const ProgramService = crudGenerator<IProgram>(Collections.Program);
export const ResultService = crudGenerator<IResult>(Collections.Result);
export const ThreadService = crudGenerator<Thread>(Collections.Thread);
