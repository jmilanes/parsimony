import { modelTypes } from "../../models";
import { BaseCrudResolvers } from "../baseCrudResolver";
import { Service } from "typedi";
import { BroadcastService, DataBaseService } from "../../index";

@Service()
export class FileResolvers extends BaseCrudResolvers {
  constructor(db: DataBaseService, bs: BroadcastService) {
    super(db, bs);
    this.model = modelTypes.file;
  }
}
