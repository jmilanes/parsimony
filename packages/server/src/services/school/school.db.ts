import { SCHOOL_MODELS } from "./school.model";
import { DataBaseService } from "../database";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SchoolDB extends DataBaseService<SCHOOL_MODELS> {}
