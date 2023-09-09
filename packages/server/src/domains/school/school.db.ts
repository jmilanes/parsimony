import { Service } from "typedi";

import { SCHOOL_MODELS } from "./school.model";
import { DataBaseService } from "../../database";

@Service()
export class SchoolDB extends DataBaseService<SCHOOL_MODELS> {}
