import crudGenerator from "./crudGenerators/crudGeneratorWithLocalStorage";
import { Collections } from "../enums";
import { ISchool, IUser, IProgram, IResult } from "../types";

export const SchoolService = crudGenerator<ISchool>(Collections.School);
export const UserService = crudGenerator<IUser>(Collections.User);
export const ProgramService = crudGenerator<IProgram>(Collections.Program);
export const ResultService = crudGenerator<IResult>(Collections.Result);
