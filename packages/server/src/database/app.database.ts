import { Service } from "typedi";

import { DataBaseService } from "./dataBase.service";
import { modelTypes } from "./models";

@Service()
export class AppDB extends DataBaseService<modelTypes> {}
