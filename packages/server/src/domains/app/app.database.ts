import { Service } from "typedi";

import { DataBaseService } from "../database/dataBase.service";
import { modelTypes } from "./models";

@Service()
export class AppDB extends DataBaseService<modelTypes> {}
