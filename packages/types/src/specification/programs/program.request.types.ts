import { BasicPayload, ByRelationshipPayload } from "../shared";
import { Program } from "./program.types";
import { Description, Optional } from "@tsed/schema";

export type UpdateProgramPayload = Program;
export type CreateProgramPayload = Omit<Program, "id">;
export type DeleteProgramPayload = BasicPayload;
export type GetProgramPayload = BasicPayload;
export type GetAllProgramsByRelationshipPayload = ByRelationshipPayload;

export class AddProgramsToClientPayload {
  @Description("Id of the associated client")
  @Optional()
  clientId?: string;

  @Description("Id of the associated client")
  @Optional()
  collectionIds?: string[];

  @Description("Id of the associated client")
  @Optional()
  excludedIds?: string[];

  @Description("Id of the associated client")
  @Optional()
  programIds?: string[];

  @Description("Id of the associated client")
  @Optional()
  subscribers?: string[];
}
