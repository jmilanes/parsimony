import {
  CreateUserPayload,
  DeleteUserPayload,
  GetAllUsersByRelationshipPayload,
  GetUserPayload,
  UpdateUserPayload,
  User
} from "@parsimony/types";
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";

export class UserAsyncDataHandler extends AsyncDataHandlerInterface<
  User,
  CreateUserPayload,
  DeleteUserPayload,
  UpdateUserPayload,
  GetUserPayload,
  GetAllUsersByRelationshipPayload
> {}
