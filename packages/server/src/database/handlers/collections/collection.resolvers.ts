import { modelTypes } from "../../models";
import { BaseCrudResolvers } from "../baseCrudResolver";
import { Service } from "typedi";
import { BroadcastService, DataBaseService } from "../../index";

@Service()
export class CollectionResolvers extends BaseCrudResolvers {
  constructor(db: DataBaseService, bs: BroadcastService) {
    super(db, bs);
    this.model = modelTypes.collection;
  }
}
