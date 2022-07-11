import {
  SchoolService,
  UserService,
  ProgramService,
  ResultService,
  ThreadService
} from "./crudServices";
import { Collections } from "@parsimony/types";
import { generateData, navigateToRoute } from "../utils";
import dataAccessGenerator from "./dataAccessGenerator";
import { IProgram, IResult, ISchool, IUser } from "@parsimony/types";
import StateService from "./stateService";
import FilterService from "./filterService";
import AuthService from "./authService";

const schoolService = new SchoolService();
const userService = new UserService();
const programService = new ProgramService();
const resultsService = new ResultService();
export const threadsService = new ThreadService();

// if (localStorage.getItem("generatedData") !== "true") {
//   generateData({
//     [Collections.School]: schoolService.create,
//     [Collections.User]: userService.create,
//     [Collections.Program]: programService.create,
//     [Collections.Result]: resultsService.create
//   });
//   localStorage.setItem("generatedData", "true");
// }

export const initialData = {
  [Collections.School]: schoolService.getAll(),
  [Collections.User]: userService.getAll(),
  [Collections.Program]: programService.getAll()
};
export const StateManger = new StateService();
export const filterService = new FilterService(StateManger);
export const schoolData = dataAccessGenerator<ISchool>(
  schoolService,
  StateManger
);
export const userData = dataAccessGenerator<IUser>(userService, StateManger);
export const programData = dataAccessGenerator<IProgram>(
  programService,
  StateManger
);
export const resultsData = dataAccessGenerator<IResult>(
  resultsService,
  StateManger
);

export const authService = new AuthService(userData);
console.log(
  "🚀 ~ file: dataAccessServices.tsx ~ line 54 ~ authService",
  authService.getCurrentUser()
);
