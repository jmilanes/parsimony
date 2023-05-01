import {
  Domains,
  CreateUserPayload,
  DeleteUserPayload,
  GetAllUsersByRelationshipPayload,
  GetUserPayload,
  UpdateUserPayload,
  User
} from "@parsimony/types";
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";
import { userRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class UserAsyncDataHandler extends AsyncDataHandlerInterface<
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
