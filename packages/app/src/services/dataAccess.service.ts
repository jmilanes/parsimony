import {
  SchoolService,
  UserService,
  ProgramService,
  ResultService,
  ThreadService,
  StateManger
} from "./crud.service";
import dataAccessGenerator from "./dataAccessGenerator";
import { ISchool } from "@parsimony/types";
import FilterService from "./filter.service";
import AuthService from "./auth.service";

const schoolService = new SchoolService();
export const threadsService = new ThreadService();

export const filterService = new FilterService(StateManger);
export const schoolData = dataAccessGenerator<ISchool>(
  schoolService,
  StateManger
);

export const userData = UserService;
export const programData = ProgramService;
export const resultsData = ResultService;
userData.init();
programData.init();
resultsData.init();

const currentUserId = userData.get(localStorage.getItem("currentUserId") || "");
export const authService = new AuthService(userData.subscribe, currentUserId);
