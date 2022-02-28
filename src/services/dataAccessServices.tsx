import { SchoolService, UserService, ProgramService } from "./crudServices";
import { Collections } from "../enums";
import { generateData } from "../utils";
import dataAccessGenerator from "./dataAccessGenerator";
import { IProgram, ISchool, IUser } from "../types";
import StateService from "./stateStervice";
import FilterService from "./filterService";

const schoolService = new SchoolService();
const userService = new UserService();
const programService = new ProgramService();

if (localStorage.getItem("generatedData") !== "true") {
  generateData({
    [Collections.School]: schoolService.create,
    [Collections.User]: userService.create,
    [Collections.Program]: programService.create
  });
  localStorage.setItem("generatedData", "true");
}

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
