import { modelTypes } from "../../models";
import { BaseCrudResolvers } from "../baseCrudResolver";
import { Service } from "typedi";
import { BroadcastService } from "../../index";
import { AppDB } from "../../app.database";

@Service()
export class ResultResolvers extends BaseCrudResolvers {
  constructor(db: AppDB, bs: BroadcastService) {
    super(db, bs);
    this.model = modelTypes.result;
  }
}
