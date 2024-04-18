import {
  Domains,
  CreateUserPayload,
  DeleteUserPayload,
  GetAllUsersByRelationshipPayload,
  GetUserPayload,
  UpdateUserPayload,
  User
} from "@parsimony/types";
import { CrudRequestHandler } from "../CrudRequestHandler";

import { Service } from "typedi";
import { createRestRequest } from "../request.utils";

@Service()
export class UserRequestHandler extends CrudRequestHandler<
  User,
  CreateUserPayload,
  DeleteUserPayload,
  UpdateUserPayload,
  GetUserPayload,
  GetAllUsersByRelationshipPayload
> {
  domainName = Domains.User;
  requests = {
    get: createRestRequest<GetUserPayload, User>("GET", "users"),
    getAll: createRestRequest<undefined, User[]>("GET", "users"),
    delete: createRestRequest<DeleteUserPayload, string>("DELETE", "users"),
    create: createRestRequest<CreateUserPayload, User>("POST", "users"),
    update: createRestRequest<UpdateUserPayload, User>("POST", "users")
  };
}
