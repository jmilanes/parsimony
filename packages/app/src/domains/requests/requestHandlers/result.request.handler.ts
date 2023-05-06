import {
  Domains,
  CreateResultPayload,
  DeleteResultPayload,
  GetAllResultsByRelationshipPayload,
  GetResultPayload,
  Result,
  UpdateResultPayload
} from "@parsimony/types";
import { IRequestHandler } from "../IRequestHandler";
import { resultRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class ResultRequestHandler extends IRequestHandler<
  Result,
  CreateResultPayload,
  DeleteResultPayload,
  UpdateResultPayload,
  GetResultPayload,
  GetAllResultsByRelationshipPayload
> {
  domainName = Domains.Result;
  requests = resultRequests;
}
