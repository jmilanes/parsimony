import { BasicPayload, ByRelationshipPayload } from "../shared";

import { Description, Optional, Required } from "@tsed/schema";
import { Program } from "./progam.type";
import { DeepPartial } from "chart.js/types/utils";

export type UpdateProgramPayload = DeepPartial<Program>;
export type CreateProgramPayload = Omit<Program, "id">;
export type DeleteProgramPayload = BasicPayload;
export type GetProgramPayload = BasicPayload;
export type GetAllProgramsByRelationshipPayload = ByRelationshipPayload;

export class AddProgramsToClientPayload {
  @Description("Id of client adding program to")
  @Required()
  clientId: string;

  @Description("Ids of collections being added")
  @Required()
  collectionIds: string[] = [];

  @Description("Ids of any excluded program ids")
  @Required()
  excludedIds: string[] = [];

  @Description("Ids of any leaf programs")
  @Required()
  programIds: string[] = [];

  @Description(
    "Subscribers to the newly created programs (TODO maybe this is just the adder...)"
  )
  @Required()
  subscribers: string[] = [];
}
