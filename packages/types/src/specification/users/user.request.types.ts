import { User } from "./user.types";
import { BasicPayload, ByRelationshipPayload } from "../shared";

export type UpdateUserPayload = User;
export type CreateUserPayload = Omit<User, "id">;
export type DeleteUserPayload = BasicPayload;
export type GetUserPayload = BasicPayload;
export type GetAllUsersByRelationshipPayload = ByRelationshipPayload;
