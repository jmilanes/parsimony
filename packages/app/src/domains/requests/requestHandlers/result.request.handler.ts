import {
  Domains,
  CreateResultPayload,
  DeleteResultPayload,
  GetAllResultsByRelationshipPayload,
  GetResultPayload,
  Result,
  UpdateResultPayload,
  GetProgramPayload
} from "@parsimony/types";
import { CrudRequestHandler } from "../CrudRequestHandler";
import { Service } from "typedi";
import { createRestRequest } from "../request.utils";

@Service()
export class ResultRequestHandler extends CrudRequestHandler<
  Result,
  CreateResultPayload,
  DeleteResultPayload,
  UpdateResultPayload,
  GetResultPayload,
  GetAllResultsByRelationshipPayload
> {
  domainName = Domains.Result;
  requests = {
    get: createRestRequest<GetProgramPayload, Result>("GET", "results"),
    getAll: createRestRequest<undefined, Result[]>("GET", "results"),
    delete: createRestRequest<DeleteResultPayload, string>("DELETE", "results"),
    create: createRestRequest<CreateResultPayload, Result>("POST", "results"),
    update: createRestRequest<UpdateResultPayload, Result>("POST", "results")
  };
}
