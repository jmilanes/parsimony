import { modelTypes } from "../../models";
import { BaseCrudResolvers } from "../baseCrudResolver";
import { Service } from "typedi";
import { BroadcastService } from "../../../database";
import { AppDataGateway } from "../../app.data.gateway";

@Service()
export class CollectionResolvers extends BaseCrudResolvers {
  constructor(db: AppDataGateway, bs: BroadcastService) {
    super(db, bs);
    this.model = modelTypes.collection;
  }
}
