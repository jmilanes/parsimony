import crudGenerator from "./crudGenerators/crudGeneratorWithLocalStorage";
import {
  Collections,
  CreateProgramPayload,
  CreateResultPayload,
  CreateUserPayload,
  DeleteProgramPayload,
  DeleteResultPayload,
  DeleteUserPayload,
  GetProgramPayload,
  GetResultPayload,
  GetUserPayload,
  Result,
  UpdateProgramPayload,
  UpdateResultPayload,
  UpdateUserPayload
} from "@parsimony/types";
import { ISchool, User, Program, Thread } from "@parsimony/types";
import { AsyncCrudGenerator, Store } from "./store";
import userRequests from "../bal/requests/users.requests";
import StateService from "./state.service";
import programRequests from "../bal/requests/programs.requests";
import resultRequests from "../bal/requests/results.requests";

export const store = new Store();
export const StateManger = new StateService(store);

export const UserService = new AsyncCrudGenerator<
  User,
  CreateUserPayload,
  DeleteUserPayload,
  UpdateUserPayload,
  GetUserPayload
>(Collections.User, userRequests, store);

export const ProgramService = new AsyncCrudGenerator<
  Program,
  CreateProgramPayload,
  DeleteProgramPayload,
  UpdateProgramPayload,
  GetProgramPayload
>(Collections.Program, programRequests, store);

export const ResultService = new AsyncCrudGenerator<
  Result,
  CreateResultPayload,
  DeleteResultPayload,
  UpdateResultPayload,
  GetResultPayload
>(Collections.Result, resultRequests, store);

export const SchoolService = crudGenerator<ISchool>(Collections.School);
export const ThreadService = crudGenerator<Thread>(Collections.Thread);
