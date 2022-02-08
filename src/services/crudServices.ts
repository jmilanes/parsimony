import crudGenerator from "./crudGenerator";
import { Collections } from "../enums";
import { ISchool, IUser, IProgram } from "../types";

export const SchoolService = crudGenerator<ISchool>(Collections.School);
export const UserService = crudGenerator<IUser>(Collections.User);
export const ProgramService = crudGenerator<IProgram>(Collections.Program);
