import crudGenerator from "./crudGenerators/crudGeneratorWithLocalStorage";
import {
  Collections,
  CreateProgramPayload,
  CreateUserPayload,
  DeleteProgramPayload,
  DeleteUserPayload,
  GetProgramPayload,
  GetUserPayload,
  UpdateProgramPayload,
  UpdateUserPayload
} from "@parsimony/types";
import { ISchool, User, Program, IResult, Thread } from "@parsimony/types";
import { AsyncCrudGenerator, Store } from "./store";
import userRequests from "../bal/requests/users";
import StateService from "./stateService";
import programRequests from "../bal/requests/programs";

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

export const SchoolService = crudGenerator<ISchool>(Collections.School);
export const ResultService = crudGenerator<IResult>(Collections.Result);
export const ThreadService = crudGenerator<Thread>(Collections.Thread);
