import {
  SchoolService,
  UserService,
  ProgramService,
  ResultService,
  ThreadService,
  StateManger
} from "./crudServices";
import { Collections } from "@parsimony/types";
import dataAccessGenerator from "./dataAccessGenerator";
import { IResult, ISchool } from "@parsimony/types";
import FilterService from "./filterService";
import AuthService from "./authService";

const schoolService = new SchoolService();
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
  [Collections.User]: UserService.getAll()
};

export const filterService = new FilterService(StateManger);

export const schoolData = dataAccessGenerator<ISchool>(
  schoolService,
  StateManger
);

export const resultsData = dataAccessGenerator<IResult>(
  resultsService,
  StateManger
);

export const userData = UserService;
export const programData = ProgramService;
userData.init();
programData.init();

const currentUserId = userData.get(localStorage.getItem("currentUserId") || "");
export const authService = new AuthService(userData.subscribe, currentUserId);
