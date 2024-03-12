import { BasicPayload, ByRelationshipPayload } from "../shared";
import { Program } from "./program.types";
import { Description, Optional } from "@tsed/schema";

export type UpdateProgramPayload = Program;
export type CreateProgramPayload = Omit<Program, "id">;
export type DeleteProgramPayload = BasicPayload;
export type GetProgramPayload = BasicPayload;
export type GetAllProgramsByRelationshipPayload = ByRelationshipPayload;

export class AddProgramsToClientPayload {
  @Description("Id of client adding program to")
  @Optional()
  clientId?: string;

  @Description("Ids of collections being added")
  @Optional()
  collectionIds?: string[];

  @Description("Ids of any excluded program ids")
  @Optional()
  excludedIds?: string[];

  @Description("Ids of any leaf programs")
  @Optional()
  programIds?: string[];

  @Description(
    "Subscribers to the newly created programs (TODO maybe this is just the adder...)"
  )
  @Optional()
  subscribers?: string[];
}
