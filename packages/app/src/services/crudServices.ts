import crudGenerator from "./crudGenerators/crudGeneratorWithLocalStorage";
import { Collections } from "@parsimony/types";
import { ISchool, IUser, IProgram, IResult, IThread } from "@parsimony/types";

export const SchoolService = crudGenerator<ISchool>(Collections.School);
export const UserService = crudGenerator<IUser>(Collections.User);
export const ProgramService = crudGenerator<IProgram>(Collections.Program);
export const ResultService = crudGenerator<IResult>(Collections.Result);
export const ThreadService = crudGenerator<IThread>(Collections.Thread);
