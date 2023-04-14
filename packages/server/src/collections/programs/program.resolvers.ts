import { modelTypes } from "../../database/models";
import { BaseCrudResolvers } from "../baseCrudResolver";
import { Service } from "typedi";
import { BroadcastService, DataBaseService } from "../../database";

@Service()
export class ProgramResolvers extends BaseCrudResolvers {
  #db: DataBaseService;

  constructor(db: DataBaseService, bs: BroadcastService) {
    super(db, bs);
    this.#db = db;
    this.model = modelTypes.program;
  }

  //TODO Delete all Program results when a program is deleted
  delete = async (_: any, { payload }: { payload: any }) => {
    console.log("FROM Program Delete Extension");
    await this.#db.deleteEntry(this.model, payload.id);
    return payload.id;
  };
}
