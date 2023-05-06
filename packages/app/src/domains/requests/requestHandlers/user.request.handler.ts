import {
  Domains,
  CreateUserPayload,
  DeleteUserPayload,
  GetAllUsersByRelationshipPayload,
  GetUserPayload,
  UpdateUserPayload,
  User
} from "@parsimony/types";
import { IRequestHandler } from "../IRequestHandler";
import { userRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class UserRequestHandler extends IRequestHandler<
  User,
  CreateUserPayload,
  DeleteUserPayload,
  UpdateUserPayload,
  GetUserPayload,
  GetAllUsersByRelationshipPayload
> {
  domainName = Domains.User;
  requests = userRequests;
}
