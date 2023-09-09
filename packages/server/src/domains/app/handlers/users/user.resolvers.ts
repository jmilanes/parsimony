import { BroadcastService, modelTypes } from "../../../database";
import { BaseCrudResolvers } from "../baseCrudResolver";
import { Service } from "typedi";
import { AppDB } from "../../app.database";

@Service()
export class UserResolvers extends BaseCrudResolvers {
  constructor(db: AppDB, bs: BroadcastService) {
    super(db, bs);
    this.model = modelTypes.user;
  }
}
