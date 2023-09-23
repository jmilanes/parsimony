import { BroadcastService, modelTypes } from "../../../database";
import { BaseCrudResolvers } from "../baseCrudResolver";
import { Service } from "typedi";
import { AppDataGateway } from "../../app.data.gateway";

@Service()
export class UserResolvers extends BaseCrudResolvers {
  constructor(db: AppDataGateway, bs: BroadcastService) {
    super(db, bs);
    this.model = modelTypes.user;
  }
}
