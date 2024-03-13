import { BasicPayload, ByRelationshipPayload } from "../shared";
import { Result } from "./result.types";

export type UpdateResultPayload = Result;
export type CreateResultPayload = Omit<Result, "id">;
export type DeleteResultPayload = BasicPayload;
export type GetResultPayload = BasicPayload;
export type GetAllResultsByRelationshipPayload = ByRelationshipPayload;
