import { modelTypes } from "../../models";
import { BaseCrudResolvers } from "../baseCrudResolver";
import { AppDataGateway } from "../../app.data.gateway";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CollectionResolvers extends BaseCrudResolvers {
  constructor(db: AppDataGateway) {
    super(db);
    this.model = modelTypes.collection;
  }
}
