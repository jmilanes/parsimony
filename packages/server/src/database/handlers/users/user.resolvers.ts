import { BroadcastService, DataBaseService, modelTypes } from "../../index";
import { BaseCrudResolvers } from "../baseCrudResolver";
import { Service } from "typedi";

@Service()
export class UserResolvers extends BaseCrudResolvers {
  constructor(db: DataBaseService, bs: BroadcastService) {
    super(db, bs);
    this.model = modelTypes.user;
  }
}
