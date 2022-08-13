import {
  SchoolService,
  UserService,
  ProgramService,
  ResultService,
  ThreadService,
  StateManger
} from "./crudServices";
import dataAccessGenerator from "./dataAccessGenerator";
import { ISchool } from "@parsimony/types";
import FilterService from "./filterService";
import AuthService from "./authService";

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
